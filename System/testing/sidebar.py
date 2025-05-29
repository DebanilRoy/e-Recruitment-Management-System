import chromedriverimport as DriverImport
import loginscript

DriverImport.time.sleep(2)
DELAY = 2

links = [
    "Open Recruitments",
    "Closed Recruitments",
    "Open Applications",
    "Closed Applications",
    "Open Offers",
    "Previous Offers"
]

# === TEST SCRIPT ===
# Click each link in the list
for link_text in links:
    link = DriverImport.driver.find_element(DriverImport.By.LINK_TEXT, link_text)
    link.click()
    print(f"Clicked on link: {link_text}")
    DriverImport.time.sleep(DELAY)  # Wait for page to load

# Finally, return to the first link
first_link = DriverImport.driver.find_element(DriverImport.By.LINK_TEXT, links[0])
first_link.click()
print(f"Returned to first link: {links[0]}")

# === CLEANUP ===
print("Navigation test completed.")
DriverImport.time.sleep(2)