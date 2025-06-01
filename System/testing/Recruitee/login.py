from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.get("http://localhost:3000")

email = driver.find_element(By.ID, "email")
pwd = driver.find_element(By.ID, "pwd")

try:
    pwd.submit()

    WebDriverWait(driver, 3).until(
        EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Details not Entered!')]"))
    )
    print("Test Passed: Details Not Entered Found")
except:
    print("Test Failed: Details Not Entered not Found")


try:
    email.send_keys("abcd")

    pwd.send_keys("abcd")
    pwd.submit() 

    WebDriverWait(driver, 3).until(
        EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Incorrect Credentials')]"))
    )
    print("Test Passed: Incorrect Credentials Found")
except:
    print("Test Failed: 'Incorrect Credentials not Found'")

try:
    email.clear()
    email.send_keys("admin")
    
    pwd.clear()
    pwd.send_keys("admin")

    pwd.submit() 
    
    WebDriverWait(driver, 3).until(
        EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Welcome')]"))
    )
    print("Test Passed: Login Allowed, User Dashboard Found")
except:
    print("Test Failed: Login Not Allowed, User Dashboard Not Found")

driver.quit()