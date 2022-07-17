const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const path = require("path");
const readmeBox = require("readme-box").ReadmeBox;
const chunk = require("chunk");

const sortUsers = (users) => {
  const sortedUsers = users.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sortedUsers;
};

const generateCell = (cell) => {
  const objectFieldNames = JSON.parse(core.getInput("object-field-names"));
  let htmlCell = core.getInput("html-cell");

  objectFieldNames.forEach((name) => {
    htmlCell = "  " + htmlCell.replace(new RegExp(`{{ ${name} }}`), cell[name]);
  });
  console.log(objectFieldNames);
  console.log(htmlCell);
  return htmlCell;
};

const generateRow = (row) => {
  const cells = row.map((cell) => generateCell(cell));

  return cells.join("");
};

(async () => {
  const githubToken = core.getInput("github-token");
  const filePath = path.join(
    process.env.GITHUB_WORKSPACE,
    core.getInput("json-file-path")
  );
  const data = fs.readFileSync(filePath, "utf8");
  const json = sortUsers(JSON.parse(data));
  const fileToUsePath = core.getInput("file-to-use");

  try {
    const content = chunk(json, 1).map((row) => generateRow(row));
    const table = `- Journeys\n\n${content.join("\n")}`;

    await readmeBox.updateSection(table, {
      owner: process.env.GITHUB_REPOSITORY.split("/")[0],
      repo: process.env.GITHUB_REPOSITORY.split("/")[1],
      branch: process.env.GITHUB_REF.split("/")[2],
      token: githubToken,
      section: "data-section",
      path: fileToUsePath,
    });
  } catch (error) {
    core.setFailed(JSON.stringify(error));
    console.log(error);
  }
})();
