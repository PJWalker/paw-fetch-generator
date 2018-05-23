/* eslint class-methods-use-this:0 */
/* global registerCodeGenerator */

class FetchGenerator {
  generateRequest({ url, method, headers, name, body, description }) {
    const fetchOptions = [];
    if (method !== "GET") {
      fetchOptions.push(`method: "${method}"`);
    }
    if (headers) {
      console.log(headers["Content-Type"]);
      const headerString = Object.keys(headers).reduce(
        (prev, key, i) =>
          `${prev}${i === 0 ? "" : ", "}${key}: "${headers[key]}"`,
        ""
      );
      fetchOptions.push(`headers: { ${headerString} }`);
    }
    if (body) {
      fetchOptions.push(`body: ${body}`);
    }

    if (fetchOptions.length === 0) {
      return `const ${name}Fetch = fetch("${url}");`;
    }

    const descriptionString = description ? `/* ${description} */\n` : "";

    return `${descriptionString}const ${name}Fetch = fetch(
  "${url}",
  {${fetchOptions.join(", ")}}
);`;
  }

  generate(context, requests) {
    return this.generateRequest(requests).trim();
  }
}

FetchGenerator.identifier = "com.pjwdev.FetchGenerator";
FetchGenerator.title = "Fetch Generator";

FetchGenerator.fileExtension = "js";
FetchGenerator.languageHighlighter = "javascript";
registerCodeGenerator(FetchGenerator);
