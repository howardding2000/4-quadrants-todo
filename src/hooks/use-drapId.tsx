import { useState } from "react";

export const useDrapId= (item:any) => {
  const [ctx] = useState<any>({});

  Object.keys(item).forEach(key => {
    ctx[key] = item[key]
  })
  return ctx;
};
