.PHONY: clean sv

clean:
	rm -rf .angular/

sv: clean
	ng serve
