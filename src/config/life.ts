export type LifePhoto = {
  src: string;
  caption: string;
  location?: string;
  date?: string;
  quote?: string;
};

export const LIFE_PHOTOS: LifePhoto[] = [
  // public/life/ 폴더에 사진 넣고 여기에 추가하세요
  {
    src: "/life/life-run.mp4",
    caption: "퇴근 후 힐링 한상 런",
    location: "Seoul",
    date: "2026.05",
    quote: "달리면 생각이 정리된다",
  },
  {
    src: "/life/life-kyungju.mp4",
    caption: "경주 여행",
    location: "Kyungju",
    date: "2026.04",
    quote: "느리게 걷고 오래 머물렀던 곳",
  },
];
