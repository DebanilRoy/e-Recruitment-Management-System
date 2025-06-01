import chromedriverimport as DriverImport
from selenium.webdriver.support.ui import Select
import time

accType = Select(DriverImport.driver.find_element(DriverImport.By.ID, "accType"))
email = DriverImport.driver.find_element(DriverImport.By.ID, "email")
pwd = DriverImport.driver.find_element(DriverImport.By.ID, "pwd")

accType.select_by_visible_text("Recruiter")
email.send_keys("admin")
pwd.send_keys("admin")

pwd.submit() 

time.sleep(1)