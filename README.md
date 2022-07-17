# Markdown Link Generator

This GitHub Action creates a markdown link in your `README.md` from a json file. This github-action is specially created for **[collab-community/journey-book](https://github.com/collab-community/journey-book)** repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/neontuts/gh-actions-markdown-link-generator)

> Screenshot goes here...

## Inputs

### `github-token` [REQUIRED]

This is available in your GitHub Action

```yaml
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
```

### `html-cell` [REQUIRED]

This is the html table cell content with `object-field-names`

```yaml
with:
  html-cell: "<td>{{ firstname }} {{ lastname }}</td>"
```

### `object-field-names` [REQUIRED]

This is json, and contains a list of the names of the fields in your json file data object

```yaml
with:
  object-field-names: '[ "firstname", "lastname" ]'
```

### `columns` [OPTIONAL]

**defaults to `2`**

```yaml
with:
  columns: 3
```

### `json-file-path` [OPTIONAL]

**defaults to `Data.json`**

```yaml
with:
  json-file-path: "your-filename.json"
```

### `file-to-use` [OPTIONAL]

**Defaults to `README.md`**

```yaml
with:
  file-to-use: "README.md"
```

## Example usage

Add `<!--START_SECTION:data-section-->` and `<!--END_SECTION:data-section-->` where you would like your table to appear in your README.

```yaml
jobs:
  table:
    runs-on: ubuntu-latest
    name: Update README from json data
    steps:
      - uses: actions/checkout@v2
      - name: Read/Write data into README
        uses: neontuts/gh-actions-markdown-link-generator@main
        with:
          json-file-path: "Data.json"
          github-token: ${{ secrets.GITHUB_TOKEN }}
          object-field-names: '[ "name", "username" ]'
          file-to-use: "README.md"
          html-cell: '<td><a href="../#/journeys/{{ username }}.md">{{ name }}</a></td>'
```

### Json file

```typescript
[
  {
    name: "Adarsh Jaiswal",
    username: "Adarsh-jaiss",
    avatar: "https://github.com/Adarsh-jaiss.png",
  },
  {
    name: "Kendall Pinto",
    username: "KendallDoesCoding",
    avatar: "https://github.com/KendallDoesCoding.png",
  },
  {
    name: "Vikas Ganiga",
    username: "vikasganiga05",
    avatar: "https://github.com/vikasganiga05.png",
  },
];
```
