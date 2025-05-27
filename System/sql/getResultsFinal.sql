SELECT GROUP_CONCAT(
	DISTINCT CONCAT("MAX(CASE WHEN subjects.subjectName = '", s.subjectName, "' THEN results.result ELSE 0 END) AS '", s.subjectName, "'")
		ORDER BY s.priority ASC
) INTO @pivot_query
FROM subjects s LEFT JOIN results r ON s.subjectID = r.subjectID 
WHERE s.recruitmentID = 'R003';

SET @sql = CONCAT (
"SELECT applications.applicationID, CONCAT(applicants.firstName, ' ' , applicants.lastName) AS 'applicantName', applicants.applicantID, applicants.dob, ", @pivot_query,
"FROM applications applications 
INNER JOIN applicants applicants ON applications.applicantID = applicants.applicantID
INNER JOIN results results ON applications.applicationID = results.applicationID 
INNER JOIN subjects subjects ON results.recruitmentID = subjects.recruitmentID
WHERE applications.recruitmentID = 'R003' 
GROUP BY applications.applicationID"); 

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;