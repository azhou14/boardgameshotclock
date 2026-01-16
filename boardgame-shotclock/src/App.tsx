import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Board Game Shot Clock</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button className="flex-1">Start</Button>
          <Button variant="secondary" className="flex-1">
            Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
