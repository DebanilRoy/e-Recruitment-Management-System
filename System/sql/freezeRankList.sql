CREATE DEFINER=`root`@`localhost` 
PROCEDURE `freeze_ranklist`(IN recruitmentID VARCHAR(12))
BEGIN    
    SELECT CONCAT("INSERT INTO ranklist (applicationID, recruitmentID, ranklist.rank)
	SELECT rt.applicationID, '" , recruitmentID, "' as 'recruitmentID', rt.rank 
    FROM rank_table_", recruitmentID, " rt ;") into @freeze_ranklist_query;

	SET @delete_ranklist_query = CONCAT("DROP TABLE rank_table_", recruitmentID);
	PREPARE stmt FROM @freeze_ranklist_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    PREPARE stmt FROM @delete_ranklist_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
	UPDATE recruitment r
    SET isFrozen = true
    WHERE r.recruitmentID = recruitmentID;
END