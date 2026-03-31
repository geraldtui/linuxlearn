# feature-merge

Merge the current feature branch into main/master and switch to it.

This command will:
1. Check for uncommitted or staged changes (fails if found)
2. Get the current branch name
3. Determine if the repo uses 'main' or 'master'
4. Switch to the target branch (main/master)
5. Merge the feature branch into it
6. Stay on the main/master branch

**Prerequisites:**
- No uncommitted or staged changes
- Not already on main/master branch
- Target branch (main or master) must exist

**Usage:** /feature-merge

---

```bash
#!/bin/bash

# Check for uncommitted or staged changes
if ! git diff-index --quiet HEAD --; then
    echo "❌ Error: You have uncommitted changes. Please commit or stash them first."
    git status --short
    exit 1
fi

if ! git diff --cached --quiet; then
    echo "❌ Error: You have staged changes. Please commit or unstage them first."
    git status --short
    exit 1
fi

# Get the current branch name
CURRENT_BRANCH=$(git branch --show-current)

# Check if we're already on main or master
if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
    echo "ℹ️  Already on $CURRENT_BRANCH branch. Nothing to merge."
    exit 0
fi

# Determine if the repo uses 'main' or 'master'
if git show-ref --verify --quiet refs/heads/main; then
    TARGET_BRANCH="main"
elif git show-ref --verify --quiet refs/heads/master; then
    TARGET_BRANCH="master"
else
    echo "❌ Error: Neither 'main' nor 'master' branch exists."
    exit 1
fi

echo "📋 Current branch: $CURRENT_BRANCH"
echo "🎯 Target branch: $TARGET_BRANCH"
echo ""

# Switch to target branch
echo "🔄 Switching to $TARGET_BRANCH..."
git checkout "$TARGET_BRANCH"

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to switch to $TARGET_BRANCH"
    exit 1
fi

# Merge the feature branch
echo "🔀 Merging $CURRENT_BRANCH into $TARGET_BRANCH..."
git merge "$CURRENT_BRANCH"

if [ $? -ne 0 ]; then
    echo "❌ Error: Merge failed. Please resolve conflicts manually."
    exit 1
fi

echo ""
echo "✅ Successfully merged $CURRENT_BRANCH into $TARGET_BRANCH"
echo "✅ Currently on $TARGET_BRANCH branch"
```
