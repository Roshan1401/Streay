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
  typescript: {
    icon: <SiTypescript />,
    color: "#3178c6",
  },
  python: {
    icon: <SiPython />,
    color: "#3572A5",
  },
  rust: {
    icon: <SiRust />,
    color: "#dea584",
  },
  go: {
    icon: <SiGo />,
    color: "#00ADD8",
  },
  html: {
    icon: <SiHtml5 />,
    color: "#e34c26",
  },
  css: {
    icon: <SiCss />,
    color: "#563d7c",
  },
  react: {
    icon: <SiReact />,
    color: "#61dafb",
  },
  vue: {
    icon: <SiVuedotjs />,
    color: "#42b883",
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
  cpp: {
    icon: <SiCplusplus />,
    color: "#f34b7d",
  },
  c: {
    icon: <SiC />,
    color: "#555555",
  },
  java: {
    icon: <FaJava />,
    color: "#b07219",
  },
  sql: {
    icon: <SiMysql />,
    color: "#e38c00",
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
};

// Helper functions
export const getLanguageIcon = (lang: string): React.ReactNode => {
  return languageConfig[lang.toLowerCase()]?.icon ?? null;
};

export const getLanguageColor = (lang: string): string => {
  return languageConfig[lang.toLowerCase()]?.color ?? "#888888";
};
