/* eslint class-methods-use-this:0 */
/* global registerCodeGenerator */

class FetchGenerator {
  generateRequest({ url, method, headers, name, body, description }) {
    const snakeCase = str =>
      `${str.replace(/(\w)(?:\s+)(\w)/gm, "$1_$2").trim()}_fetch`;
    const varName = snakeCase(name);

    const comment = description ? `/* ${description} */\n` : "";

    const init = [];
    if (method !== "GET") {
      init.push(`method: "${method}"`);
    }
    if (Object.keys(headers).length > 0) {
      const headerString = Object.keys(headers).reduce(
        (prev, key, i) =>
          `${prev}${i === 0 ? "" : ", "}${key}: "${headers[key]}"`,
        ""
      );
      init.push(`headers: { ${headerString} }`);
    }
    if (body) {
      init.push(`body: "${body.replace(/[""]/g, '\\"')}"`);
    }
    if (init.length === 0) {
      return `${comment}const ${varName} = fetch("${encodeURI(url)}");`;
    }

    return `${comment}const ${varName} = fetch(
  "${encodeURI(url)}",
  {${init.join(", ")}}
);`;
  }

  generate(context, requests) {
    return this.generateRequest(requests).trim();
  }
}

FetchGenerator.identifier = "com.pjwdev.FetchGenerator";
FetchGenerator.title = "Fetch";

FetchGenerator.fileExtension = "js";
FetchGenerator.languageHighlighter = "javascript";

registerCodeGenerator(FetchGenerator);
