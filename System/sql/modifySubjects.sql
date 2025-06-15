CREATE DEFINER=`root`@`localhost` 
PROCEDURE `modify_subjects`(IN recruitmentID VARCHAR(12), subjects JSON)
BEGIN
	CREATE TEMPORARY TABLE temp_subjects
    SELECT recruitmentID AS 'recruitmentID', jt.* FROM JSON_TABLE(
		subjects,
        '$[*]' COLUMNS (
			subjectName VARCHAR(45) PATH '$.subjectName',
            priority INT PATH '$.priority'
        )
    ) as jt;
    
    DELETE FROM subjects
    WHERE subjects.recruitmentID = recruitmentID;
    
    INSERT INTO subjects (recruitmentID, subjectName, priority)
    SELECT * FROM temp_subjects;
    
    DROP TEMPORARY TABLE temp_subjects;
END