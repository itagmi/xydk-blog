export type LifePhoto = {
  src: string;
  poster?: string;
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
    quote:
      "퇴근 후 가끔 한강을 뛰며 머릿속을 정리한다.\n땀이 식을 때쯤 답이 나온다.\n그래서 오늘도 뛰었다.",
  },
  {
    src: "/life/life-kyungju.mp4",
    caption: "경주 여행",
    location: "Kyungju",
    date: "2026.04",
    quote:
      "세상 곳곳에 작은 힐링이 있다. 그곳에서 작은 행복을 찾아보자. \n조용하고 고즈넉한 곳이 좋다.",
  },
  {
    src: "/life/life-coex.mp4",
    caption: "AI Security 행사",
    location: "Seoul",
    date: "2025.08",
    quote:
      "AI Security 행사에서 새로운 지식을 얻고 \n동료들과 즐거운 시간을 보냈다.\n더 나은 서비스를 만들기 위해 노력한다.",
  },
  {
    src: "/life/life-sanhai.mp4",
    caption: "상하이 여행",
    location: "Shanghai",
    date: "2025.09",
    quote:
      "친구들과 함께 상하이 여행을 떠났다.\n새로운 경험을 만들고 즐거운 시간을 보냈다.",
  },
  {
    src: "/life/life-kanye.mp4",
    caption: "칸예 웨스트 내한 공연",
    location: "Seoul",
    date: "2025.07",
    quote:
      "칸예 웨스트 내한 공연을 관람했다.\n좋은 음악은 내 인생을 더 풍요롭게 만든다.",
  },
];
