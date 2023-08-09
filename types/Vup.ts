type Vup = {
  name: string;
  uid: string;
  fansCount: number;
  avatar: string;
  level: number;
  description: string;
  fanTag: {
    tag: string;
    frequency: number;
  }[];
  fansHistory: {
    fans: number;
    date: string;
  }[];
  fans: string[]
};

export default Vup;
