const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);

const regex = /^\b(feat|fix|tweak|refactor|style|docs|test|build|tool|deps|misc)\b(\(\b(ui|server)\b\))?: [A-Z][a-z]*/g;

const checkTitle = (commit, hash) => {
  if (commit.slice(0, 5) === 'Merge') {
    console.log(`Commit ${hash} is a merge commit.`);
    return;
  }
  if (commit.length > 72) {
    throw new Error(`The title of the commit ${hash} exceeds 72 characters.`);
  }
  if (!commit.match(regex)) {
    throw new Error(`The title of the commit ${hash} does not match required format. Please refer to dev-standards for the correct format.`);
  }

  console.log(`Commit ${hash} looks good!`);
};

const checkGitCommits = async () => {
  try {
    // const upstreamRepoHTTPS = 'https://github.com/Megaloden106/personal-finance-manager.git';
    // const upstreamRepoSSH = 'git@github.com/Megaloden106/personal-finance-manager.git';
    // const { stdout: remoteRef } = await execAsync(`git config --list | grep -e ${upstreamRepoHTTPS} -e ${upstreamRepoSSH}`);
    // const upstreamName = remoteRef.split('.')[1];
    const { stdout: newCommits } = await execAsync(`git log origin/develop.. --pretty=format:%h`);

    const newCommitsArray = newCommits.split('\n');

    console.log(`Checking the format for commit(s) ${newCommitsArray.join(' ')}`);

    await Promise.all(newCommitsArray.map(async hash => {
      const { stdout: title } = await execAsync(`git log ${hash} --pretty=format:%s -1`);
      checkTitle(title, hash);
    }))
  } catch (e) {
    console.log('Error: ', e.message);
    process.exit(1);
  }
};

(async function() {
  await checkGitCommits();
})();