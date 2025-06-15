CREATE DEFINER=`root`@`localhost` 
PROCEDURE `save_results`(IN recruitmentID VARCHAR(12), results JSON)
BEGIN
	
    CREATE TEMPORARY TABLE temp_results (
		recruitmentID VARCHAR(12),
		applicationID VARCHAR(45),
		subjectID VARCHAR(6),
		result INT);
    
    INSERT INTO temp_results (recruitmentID, applicationID, subjectID, result) 
    SELECT 
		recruitmentID as 'recruitmentID', 
        jt.* FROM JSON_TABLE (
			results, 
			'$[*]' COLUMNS (
				applicationID VARCHAR(45) PATH '$.applicationID',
				subjectID VARCHAR(6) PATH '$.subjectID',
				result INT PATH '$.result'
			) 
		) AS jt;
    
	INSERT INTO results (recruitmentID, applicationID, subjectID, result) 
    SELECT * FROM temp_results
    ON DUPLICATE KEY UPDATE 
		result = VALUES(result);
	
    DELETE FROM results
    WHERE results.recruitmentID = recruitmentID
    AND applicationID NOT IN (SELECT applicationID FROM temp_results);

    DROP TEMPORARY TABLE temp_results;
END