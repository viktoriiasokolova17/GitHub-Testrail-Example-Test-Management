# GitHub Test Management System (TestRail Alternative)

A complete package for organizing testing in GitHub with functionality similar to TestRail.

---

## What is TestRail

**TestRail** is a professional test management tool. It allows you to:

- Create and organize test cases
- Run test runs
- Track test results
- Generate reports

**Our GitHub implementation** provides similar functionality:

| TestRail | GitHub (our implementation) |
|----------|--------------------------|
| Project | Repository |
| Test Suite | Folder or label |
| Section | Subfolder |
| Test Case | Issue + Markdown file |
| Test Run | Issue with checkboxes |
| Test Result | Checkbox status + comment |
| Defect | Linked Issue |

---

## Project Structure

```
├── .github/
│   └── ISSUE_TEMPLATE/        # GitHub Issue templates
│       ├── 1-test-case.yml    # Test case template
│       ├── 2-test-run.yml     # Test run template
│       ├── 3-bug-report.yml   # Bug report template
│       └── config.yml
│
└── test-management/           # Test management system
    ├── tests/                 # Automated tests
    ├── test-cases/            # Test cases
    ├── test-runs/             # Test runs
    └── dashboard/             # Interactive dashboard
```

---

## Quick Start

### Step 1: Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### Step 2: Set up labels

```bash
chmod +x .github/scripts/setup-labels.sh
./.github/scripts/setup-labels.sh
```

### Step 3: Configure GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Enable **Allow all actions**
3. Under **Workflow permissions** select **Read and write permissions**

---

## How to Use

### Method 1: Manual testing via GitHub Issues

1. Go to **Issues** → **New Issue**
2. Select template **"Test Case"** or **"Test Run"**
3. Fill out the form
4. Execute tests and mark results

### Method 2: Interactive Dashboard (recommended)

1. Open `dashboard/test-runner.html` in your browser
2. Click buttons to update status
3. Export report to Markdown

### Method 3: Automated Testing

```bash
# Install dependencies
npm install
npx playwright install

# Run tests
npm test
```

---

## Comparison

| Feature | TestRail | GitHub (basic) | GitHub (enhanced) |
|---------|----------|----------------|-------------------|
| Status update | One click | Edit markdown | **One click** |
| Real-time statistics | Yes | No | **Yes** |
| Visual reports | Yes | No | **Yes** |
| CLI support | No | No | **Yes** |
| CI/CD automation | Integrations | Basic | **Full** |
| Free | No | Yes | **Yes** |
| Test version control | No | Yes | **Yes** |
