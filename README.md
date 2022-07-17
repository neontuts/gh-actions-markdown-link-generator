# Markdown Link Generator

This GitHub Action creates a markdown link in your `README.md` from a json file. This github-action is specially created for **[collab-community/journey-book](https://github.com/collab-community/journey-book)** repository.

> Screenshot goes here...

## Inputs

### `github-token` [REQUIRED]

This is available in your GitHub Action

```yaml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

### `markdown-list` [REQUIRED]

This is the markdown link content with `object-field-names`

```yaml
with:
    markdown-list: '- [{{ title }}]({{ url }})'
```

### `object-field-names` [REQUIRED]

This is json, and contains a list of the names of the fields in your json file data object

```yaml
with:
    object-field-names: '[ "title", "url" ]'
```

### `json-file-path` [OPTIONAL]

**defaults to `Data.json`**

```yaml
with:
    json-file-path: 'your-filename.json'
```

### `markdown-file-path` [OPTIONAL]

**Defaults to `README.md`**

```yaml
with:
    markdown-file-path: 'README.md'
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
        github-token: ${{ secrets.GITHUB_TOKEN }}
        json-file-path: 'Data.json'
        markdown-file-path: '_layouts/sidebar.md'
        object-field-names: '[ "name", "username" ]'
        markdown-list: '- [{{ name }}](../journeys/{{ username }}.md)'
```

### Json file

```typescript
[
  {
    "name": "Adarsh Jaiswal",
    "username": "Adarsh-jaiss",
    "avatar": "https://github.com/Adarsh-jaiss.png"
  },
  {
    "name": "Kendall Pinto",
    "username": "KendallDoesCoding",
    "avatar": "https://github.com/KendallDoesCoding.png"
  },
  {
    "name": "Vikas Ganiga",
    "username": "vikasganiga05",
    "avatar": "https://github.com/vikasganiga05.png"
  }
]
```

From this repository usage <https://github.com/EddieJaoudeCommunity/awesome-github-profiles>
