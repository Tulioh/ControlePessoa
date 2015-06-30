webdriver-manager update --standalone

webdriver-manager start &

while ! curl http://localhost:4444/wd/hub/status
do
	sleep 1
done
