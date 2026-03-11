# Audit Dependencies

Run a full security audit and fix vulnerable packages:

1. Run `npm audit` to identify vulnerable installed packages
2. Run `npm audit fix` to apply available updates and patches
3. Run the test suite to verify the updates didn't break anything

If tests fail after fixing, report which packages caused the issue and suggest manual alternatives.
