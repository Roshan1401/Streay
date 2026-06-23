import React from "react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiRust,
  SiGo,
  SiHtml5,
  SiCss,
  SiReact,
  SiVuedotjs,
  SiPhp,
  SiRuby,
  SiSwift,
  SiKotlin,
  SiDart,
  SiCplusplus,
  SiC,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiNextdotjs,
  SiAngular,
  SiSvelte,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiRedis,
  SiGraphql,
  SiGit,
  SiLinux,
  SiJson,
  SiYaml,
  SiBootstrap,
  SiRedux,
  SiPrisma,
  SiSupabase,
  SiNginx,
  SiVite,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

interface LanguageConfig {
  icon: React.ReactNode;
  color: string;
}

export const languageConfig: Record<string, LanguageConfig> = {
  javascript: {
    icon: <SiJavascript />,
    color: "#f7df1e",
  },
  js: {
    icon: <SiJavascript />,
    color: "#f7df1e",
  },

  typescript: {
    icon: <SiTypescript />,
    color: "#3178c6",
  },
  ts: {
    icon: <SiTypescript />,
    color: "#3178c6",
  },

  python: {
    icon: <SiPython />,
    color: "#3572A5",
  },
  py: {
    icon: <SiPython />,
    color: "#3572A5",
  },

  java: {
    icon: <FaJava />,
    color: "#b07219",
  },

  c: {
    icon: <SiC />,
    color: "#555555",
  },

  cpp: {
    icon: <SiCplusplus />,
    color: "#f34b7d",
  },
  cplusplus: {
    icon: <SiCplusplus />,
    color: "#f34b7d",
  },

  rust: {
    icon: <SiRust />,
    color: "#dea584",
  },

  go: {
    icon: <SiGo />,
    color: "#00ADD8",
  },
  golang: {
    icon: <SiGo />,
    color: "#00ADD8",
  },

  html: {
    icon: <SiHtml5 />,
    color: "#e34c26",
  },

  css: {
    icon: <SiCss />,
    color: "#1572b6",
  },

  react: {
    icon: <SiReact />,
    color: "#61dafb",
  },

  vue: {
    icon: <SiVuedotjs />,
    color: "#42b883",
  },

  angular: {
    icon: <SiAngular />,
    color: "#dd0031",
  },

  svelte: {
    icon: <SiSvelte />,
    color: "#ff3e00",
  },

  nextjs: {
    icon: <SiNextdotjs />,
    color: "#000000",
  },

  php: {
    icon: <SiPhp />,
    color: "#777bb4",
  },

  ruby: {
    icon: <SiRuby />,
    color: "#cc342d",
  },

  swift: {
    icon: <SiSwift />,
    color: "#fa7343",
  },

  kotlin: {
    icon: <SiKotlin />,
    color: "#7f52ff",
  },

  dart: {
    icon: <SiDart />,
    color: "#00b4ab",
  },

  sql: {
    icon: <SiMysql />,
    color: "#e38c00",
  },

  mysql: {
    icon: <SiMysql />,
    color: "#00758f",
  },

  postgresql: {
    icon: <SiPostgresql />,
    color: "#336791",
  },

  mongodb: {
    icon: <SiMongodb />,
    color: "#47a248",
  },

  docker: {
    icon: <SiDocker />,
    color: "#2496ed",
  },

  nodejs: {
    icon: <SiNodedotjs />,
    color: "#339933",
  },

  "node.js": {
    icon: <SiNodedotjs />,
    color: "#339933",
  },

  "c++": {
    icon: <SiCplusplus />,
    color: "#00599C",
  },

  express: {
    icon: <SiExpress />,
    color: "#888888",
  },

  firebase: {
    icon: <SiFirebase />,
    color: "#ffca28",
  },

  redis: {
    icon: <SiRedis />,
    color: "#dc382d",
  },

  graphql: {
    icon: <SiGraphql />,
    color: "#e10098",
  },

  git: {
    icon: <SiGit />,
    color: "#f05032",
  },

  linux: {
    icon: <SiLinux />,
    color: "#fcc624",
  },

  json: {
    icon: <SiJson />,
    color: "#f7df1e",
  },

  yaml: {
    icon: <SiYaml />,
    color: "#cb171e",
  },

  bootstrap: {
    icon: <SiBootstrap />,
    color: "#7952b3",
  },

  redux: {
    icon: <SiRedux />,
    color: "#764abc",
  },

  prisma: {
    icon: <SiPrisma />,
    color: "#2d3748",
  },

  supabase: {
    icon: <SiSupabase />,
    color: "#3ecf8e",
  },

  nginx: {
    icon: <SiNginx />,
    color: "#009639",
  },

  vite: {
    icon: <SiVite />,
    color: "#646cff",
  },

  shell: {
    icon: <span className="font-bold">$</span>,
    color: "#4eaa25",
  },

  bash: {
    icon: <span className="font-bold">$</span>,
    color: "#4eaa25",
  },

  plaintext: {
    icon: <span className="text-xs font-bold">TXT</span>,
    color: "#888888",
  },

  markdown: {
    icon: <span className="text-xs font-bold">MD</span>,
    color: "#000000",
  },

  unknown: {
    icon: <span className="text-xs font-bold">?</span>,
    color: "#888888",
  },
};

export const getLanguageIcon = (lang: string): React.ReactNode => {
  return (
    languageConfig[lang.toLowerCase()]?.icon ?? languageConfig.unknown.icon
  );
};

export const getLanguageColor = (lang: string): string => {
  return (
    languageConfig[lang.toLowerCase()]?.color ?? languageConfig.unknown.color
  );
};
