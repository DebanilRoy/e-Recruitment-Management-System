SHOW TRIGGERS;

/*CREATE TRIGGER before_create_subjects
BEFORE INSERT ON subjects
FOR EACH ROW
	SET NEW.subjectID = LEFT(REPLACE(UUID(), '-', ''), 6), NEW.isActive = true;
    
/*CREATE TRIGGER before_create_recruitment 
BEFORE INSERT ON recruitment
FOR EACH ROW
	SET NEW.recruitmentID = LEFT(REPLACE(UUID(), '-', ''), 12);