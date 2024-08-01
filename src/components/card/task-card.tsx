import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";

type Props = {
  priority: Priority;
};

const TaskCard = ({ priority }: Props) => {
  return (
    <Card className="bg-[#F9F9F9]">
      <CardHeader className="p-4 pb-0">
        <span className="text-[#606060] font-medium ">
          Test Cross-browser Compatibility{" "}
        </span>
        <CardDescription className="text-sm font-normal">
          {" "}
          Develop and integrate user authentication using email and password.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-3 mt-3 ">
        <Badge className="w-fit" variant={priority}>
          {priority}
        </Badge>
        <span className="flex gap-2 text-[#606060] font-semibold ">
          <Clock color="#606060" /> 2023-03-15{" "}
        </span>
      </CardContent>
      <CardFooter>
        {" "}
        <span className="text-[#797979] font-medium "> 2 hr ago </span>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
