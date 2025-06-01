import chromedriverimport as DriverImport
import time
email = DriverImport.driver.find_element(DriverImport.By.ID, "email")
pwd = DriverImport.driver.find_element(DriverImport.By.ID, "pwd")

email.send_keys("admin")

pwd.send_keys("admin")
pwd.submit() 

time.sleep(1)