"use client";

import RefreshArrow from "../icons/RefreshArrow";
import { Button } from "./Button";

export default function RefreshButton() {
  return (
    <Button variant="Secondary" onClick={() => window.location.reload()}>
      <RefreshArrow className="h-6 w-6" />
    </Button>
  );
}
