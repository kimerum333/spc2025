import cheerio from 'cheerio';

export function extractImageSrcs(html) {
  const $ = cheerio.load(html);
  const srcs = [];
  $('img').each((_, img) => {
    const src = $(img).attr('src');
    if (src) srcs.push(src);
  });
  return srcs;
}

export function extractTempImageSrcs(html) {
  return extractImageSrcs(html).filter(src => src.startsWith('/temp/'));
}

export function replaceImageSrc(html, oldSrc, newSrc) {
  const $ = cheerio.load(html);
  $(`img[src="${oldSrc}"]`).attr('src', newSrc);
  return $.html();
}

export function bulkReplaceTempImages(html, mapping) {
  // mapping: { '/temp/xxx.jpg': '/uploads/yyy.jpg', ... }
  const $ = cheerio.load(html);
  $('img').each((_, img) => {
    const src = $(img).attr('src');
    if (src && mapping[src]) {
      $(img).attr('src', mapping[src]);
    }
  });
  return $.html();
}
