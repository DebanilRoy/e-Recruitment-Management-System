SELECT r.postName, r.location, r.vacancytotal, 
CASE WHEN SUM(CASE WHEN a.recruitmentID = 'R001' 
THEN 1 ELSE NULL END) > 0 THEN SUM(CASE WHEN a.recruitmentID = 'R001' 
THEN 1 ELSE NULL END) ELSE 0 END AS applicationCount
FROM recruitment r
LEFT JOIN application a ON r.recruitmentID = a.recruitmentID
WHERE r.recruitmentID = "R001"