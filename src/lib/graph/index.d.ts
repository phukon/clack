import { themes } from "./themes";
interface DataStructYear {
  year: string;
  total: number;
  range: {
    start: string;
    end: string;
  };
}
interface DataStructContribution {
  date: string;
  count: number;
  color: string;
  intensity: number;
}
interface DataStruct {
  years: DataStructYear[];
  contributions: DataStructContribution[];
}
interface Options {
  themeName?: keyof typeof themes;
  customTheme?: Theme;
  skipHeader?: boolean;
  skipAxisLabel?: boolean;
  username: string;
  data: DataStruct;
  fontFace?: string;
  footerText?: string;
  wordCount: number;
}
interface Theme {
  background: string;
  text: string;
  meta: string;
  grade4: string;
  grade3: string;
  grade2: string;
  grade1: string;
  grade0: string;
}
export declare function drawContributions(canvas: HTMLCanvasElement, opts: Options): void;
export { themes } from "./themes";
