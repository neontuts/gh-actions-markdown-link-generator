const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const path = require("path");
const readmeBox = require("readme-box").ReadmeBox;
const chunk = require("chunk");

const generateItem = (cell) => {
  const objectFieldNames = JSON.parse(core.getInput("object-field-names"));
  let markdownList = core.getInput("markdown-list");

  objectFieldNames.forEach((name) => {
    markdownList = markdownList.replace(
      new RegExp(`{{ ${name} }}`),
      cell[name]
    );
  });
  console.log(objectFieldNames);
  console.log(markdownList);
  return markdownList;
};

const generateList = (row) => {
  const cells = row.map((cell) => generateItem(cell));
  return cells.join("");
};

(async () => {
  const githubToken = core.getInput("github-token");
  const jsonFilePath = path.join(
    process.env.GITHUB_WORKSPACE,
    core.getInput("json-file-path")
  );
  const columns = core.getInput("columns");
  const data = fs.readFileSync(jsonFilePath, "utf8");
  const json = JSON.parse(data);
  const markdownFilePath = core.getInput("markdown-file-path");

  try {
    const list = generateList(json);
    console.log("LIST : ", list);

    await readmeBox.updateSection(`${list}`, {
      owner: process.env.GITHUB_REPOSITORY.split("/")[0],
      repo: process.env.GITHUB_REPOSITORY.split("/")[1],
      branch: process.env.GITHUB_REF.split("/")[2],
      token: githubToken,
      section: "data-section",
      path: markdownFilePath,
    });
  } catch (error) {
    core.setFailed(JSON.stringify(error));
    console.log(error);
  }
})();
