const mermaidCodeBlocks = document.querySelectorAll('pre > code.language-mermaid');

if (mermaidCodeBlocks.length > 0) {
  mermaidCodeBlocks.forEach((codeBlock) => {
    const pre = codeBlock.parentElement;

    pre.className = 'mermaid';
    pre.textContent = codeBlock.textContent;
  });

  const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    darkMode: true,
    themeVariables: {
      background: '#282c34',
      primaryColor: '#3e4451',
      primaryTextColor: '#abb2bf',
      primaryBorderColor: '#61afef',
      lineColor: '#61afef',
      secondaryColor: '#2c313a',
      tertiaryColor: '#21252b',
      fontFamily: 'monospace',
      mainBkg: '#3e4451',
      secondBkg: '#2c313a',
      tertiaryBkg: '#21252b',
      nodeBorder: '#61afef',
      clusterBkg: '#21252b',
      clusterBorder: '#5c6370',
      edgeLabelBackground: '#282c34',
      actorBkg: '#3e4451',
      actorBorder: '#61afef',
      actorTextColor: '#abb2bf',
      actorLineColor: '#61afef',
      signalColor: '#abb2bf',
      signalTextColor: '#abb2bf',
      noteBkgColor: '#3e4451',
      noteTextColor: '#abb2bf',
      noteBorderColor: '#e5c07b',
    },
  });

  await mermaid.run({
    querySelector: '.mermaid',
    suppressErrors: true,
  });
}
