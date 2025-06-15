CREATE DEFINER=`root`@`localhost` 
PROCEDURE `get_results`(IN recruitmentID VARCHAR(12))
BEGIN
	SELECT GROUP_CONCAT(
	DISTINCT CONCAT("MAX(CASE WHEN subjects.subjectID = '", s.subjectID, "' 
							  THEN results.result ELSE 0 END) 
							  AS '", s.subjectName, "'")
		ORDER BY s.priority ASC
	) INTO @pivot_query
	FROM subjects s
	WHERE s.recruitmentID = recruitmentID;

	SET @sql = CONCAT (
	"SELECT applications.applicationID, 
			CONCAT(applicants.firstName, ' ' , applicants.lastName) 
				AS 'applicantName', 
			applicants.applicantID, applicants.dob, ", @pivot_query,
	"FROM applications applications 
	JOIN applicants applicants ON applications.applicantID = applicants.applicantID
    INNER JOIN results results ON applications.applicationID = results.applicationID 
	INNER JOIN subjects subjects ON subjects.subjectID = results.subjectID
    WHERE applications.recruitmentID = '", recruitmentID , "' 
	GROUP BY applications.applicationID"); 

	PREPARE stmt FROM @sql;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END