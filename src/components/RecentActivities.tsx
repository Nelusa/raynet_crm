import { UserIcon, PhoneIcon, EnvelopeIcon, CalendarIcon, BanknotesIcon } from "@heroicons/react/24/outline";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: "meeting" | "call" | "email" | "task" | "deal";
}

const getActivityIcon = (type: Activity["type"]) => {
  const icons = {
    meeting: CalendarIcon,
    call: PhoneIcon,
    email: EnvelopeIcon,
    task: UserIcon,
    deal: BanknotesIcon,
  };
  return icons[type];
};

const activities: Activity[] = [
  {
    id: 1,
    user: {
      name: "Tomáš Novák",
      avatar: "/avatars/tomas.png",
    },
    action: "dokončil schůzku s",
    target: "ŠKODA AUTO a.s.",
    timestamp: "před 2 hodinami",
    type: "meeting",
  },
  {
    id: 2,
    user: {
      name: "Jana Nová",
      avatar: "/avatars/jana.png",
    },
    action: "vytvořila novou příležitost pro",
    target: "České dráhy, a.s.",
    timestamp: "před 3 hodinami",
    type: "deal",
  },
];

export const RecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nedávné aktivity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {activities.map(activity => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4"
                >
                  <Avatar>
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
