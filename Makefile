lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8

report:
	make -C app report