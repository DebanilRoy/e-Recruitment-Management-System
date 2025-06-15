CREATE DEFINER=`root`@`localhost` 
PROCEDURE `get_ranklist`(IN recruitmentID VARCHAR(12))
BEGIN
	SELECT GROUP_CONCAT(
		DISTINCT CONCAT("MAX(CASE WHEN subjects.subjectID = '", s.subjectID, "' 
									THEN results.result ELSE 0 END) AS '", s.subjectName, "'")
			ORDER BY s.priority ASC
		) INTO @pivot_query
	FROM subjects s
	WHERE s.recruitmentID = recruitmentID;
    
	IF (SELECT !recruitment.isFrozen FROM recruitment 
		WHERE recruitment.recruitmentID = recruitmentID) 
	THEN BEetIN
		SELECT CONCAT("SELECT * FROM rank_table_", recruitmentID) into @select_table_query;
		SELECT CONCAT("DROP TABLE IF EXISTS rank_table_", recruitmentID) into @drop_table_query;
			
		PREPARE stmt FROM @drop_table_query;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;

		SELECT GROUP_CONCAT(
			DISTINCT CONCAT (s.subjectName, " DESC")
				ORDER BY s.priority ASC
			) INTO @subject_query
			FROM subjects s
		WHERE s.recruitmentID = recruitmentID;
			
		SELECT GROUP_CONCAT(
			DISTINCT CONCAT ("rt.", s.subjectName)
				ORDER BY s.priority ASC
			) INTO @rank_subject_query
			FROM subjects s
		WHERE s.recruitmentID = recruitmentID;

		SET @sql = CONCAT (
			"CREATE TABLE rank_table_", recruitmentID ," AS SELECT
				ROW_NUMBER() OVER (ORDER BY total DESC, ", @subject_query, ", dob DESC) as 'rank',
				rt.applicationID,
				rt.applicantName,
				rt.applicantID,
				rt.dob,
				rt.total,", @rank_subject_query, 
				" 
			FROM (SELECT v.* FROM (SELECT	
					applications.applicationID, 
					CONCAT(applicants.firstName, ' ' , applicants.lastName) 
						AS 'applicantName', 
					applicants.applicantID, 
					date_format(applicants.dob, '%d/%m/%Y') as dob, 
					SUM(CASE WHEN subjects.recruitmentID = '", recruitmentID, "' 
								THEN results.result ELSE 0 END) as total, ", 
					@pivot_query,
				"FROM applications applications 
				JOIN applicants applicants 
					ON applications.applicantID = applicants.applicantID
				INNER JOIN results results 
					ON applications.applicationID = results.applicationID 
				INNER JOIN subjects subjects 
					ON subjects.subjectID = results.subjectID
				WHERE applications.recruitmentID = '", recruitmentID , "' 
				GROUP BY applications.applicationID) as v) as rt; "); 
				
		PREPARE stmt FROM @sql;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
		
		PREPARE stmt FROM @select_table_query;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
	END;
    
    ELSE 
    BEGIN
		SET @sql = CONCAT("SELECT	r.rank,
							applications.applicationID, 
							CONCAT(applicants.firstName, ' ' , applicants.lastName) 
								AS 'applicantName', 
							applicants.applicantID, 
							date_format(applicants.dob, '%d/%m/%Y') as dob, 
							SUM(CASE WHEN subjects.recruitmentID = 'R003' 
										THEN results.result ELSE 0 END) as total, ", 
							@pivot_query,
							" FROM applications applications
					INNER JOIN ranklist r 
						ON r.applicationID = applications.applicationID
                    INNER JOIN applicants applicants 
						ON applicants.applicantID = applications.applicantID
					INNER JOIN results results ON applications.applicationID = results.applicationID 
					INNER JOIN subjects subjects ON subjects.subjectID = results.subjectID
					WHERE applications.recruitmentID = '", recruitmentID , "' 
					GROUP BY applications.applicationID, r.rank
                    ORDER BY r.rank");

		PREPARE stmt FROM @sql;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt ;
    END;
    END IF;
END