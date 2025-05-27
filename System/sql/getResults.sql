SELECT	
	GROUP_CONCAT(DISTINCT
		CONCAT(
			'MAX(CASE WHEN s.subjectName = "', subjectName, '" THEN 1 ELSE NULL END) AS "', subjectName , '"'
		) ORDER BY priority ASC
	) INTO @pivot_query
FROM subjects WHERE recruitmentID = "R001";

SET @sql = CONCAT ( 'SELECT r.applicationID, CONCAT(ap.firstName, "", ap.lastName) AS "applicantName" , a.applicationID, ap.dob, ',
	@pivot_query,
	'FROM results r
	LEFT JOIN subjects s ON r.subjectID = s.subjectID
	INNER JOIN application a ON r.applicationID = a.applicationID INNER JOIN applicants ap ON a.applicantID = ap.applicantID
    
    GROUP BY r.applicationID ');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

/*
SELECT	
	GROUP_CONCAT(DISTINCT
		CONCAT(
			'MAX(CASE WHEN s.subjectName = "', subjectName, '" THEN 1 ELSE NULL END) AS '',subject, '''
		)
	) INTO @pivot_query
FROM subjects;