import fs from "node:fs";
import path from "node:path";

const outputDir = path.join(process.cwd(), "frontend", "public", "cria24-assets");

const assets = [
  ["nova-imagem-header.png", "https://cria24.com/nova-imagem-header.png"],
  ["portfolio-01.png", "https://cria24.com/portfolio/01.png"],
  ["portfolio-02.png", "https://cria24.com/portfolio/02.png"],
  ["portfolio-03.png", "https://cria24.com/portfolio/03.png"],
  ["lucas-vitale-perfil-novo.png", "https://cria24.com/lucas-vitale-perfil-novo.png"],
  ["lucas-workspace.jpg", "https://cria24.com/lucas-workspace.jpg"],
  ["video-header.mp4", "https://cria24.com/video-header.mp4"],
  ["avatar-roberta.jpg", "https://randomuser.me/api/portraits/women/44.jpg"],
  ["avatar-rafael.jpg", "https://randomuser.me/api/portraits/men/32.jpg"],
  ["avatar-maria.jpg", "https://randomuser.me/api/portraits/women/68.jpg"],
  ["avatar-carlos.jpg", "https://randomuser.me/api/portraits/men/45.jpg"],
  ["avatar-beatriz.jpg", "https://randomuser.me/api/portraits/women/12.jpg"],
  ["avatar-pedro.jpg", "https://randomuser.me/api/portraits/men/22.jpg"],
  ["avatar-vanessa.jpg", "https://randomuser.me/api/portraits/women/56.jpg"],
  ["avatar-felipe.jpg", "https://randomuser.me/api/portraits/men/76.jpg"],
  ["avatar-larissa.jpg", "https://randomuser.me/api/portraits/women/24.jpg"],
];

fs.mkdirSync(outputDir, { recursive: true });

for (const [fileName, url] of assets) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(path.join(outputDir, fileName), buffer);
  console.log(`${fileName} ${buffer.length}`);
}
