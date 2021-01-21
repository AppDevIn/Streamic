from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pytest

PATH = "C:\Program Files (x86)\chromedriver.exe"  # set up path for driver
driver = webdriver.Chrome(PATH)  # set up driver

driver.get("http://localhost:3000/login")  # access webpage

def test_register():
    register = driver.find_element_by_link_text("Sign Up")

    register.click()

    main = WebDriverWait(driver, 10).until(  # driver waits max 10 seconds until
        EC.presence_of_element_located((By.NAME, "email"))
    )
    main.send_keys("schoysm@gmail.com")  # enter random unused email to test

    main = WebDriverWait(driver, 10).until(  # driver waits max 10 seconds until
        EC.presence_of_element_located((By.NAME, "name"))
    )
    main.send_keys("SandraC")

    main = WebDriverWait(driver, 10).until(  # driver waits max 10 seconds until
        EC.presence_of_element_located((By.NAME, "password"))
    )
    main.send_keys("SandraTEST123")

    main.send_keys(Keys.RETURN)
