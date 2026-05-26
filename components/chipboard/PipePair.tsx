// PipePair — two PCB-routed pipes between a peripheral chip and MarCat.
// Each pipe connects from one specific peripheral pin tip to one specific MarCat pin tip
// via a 2-segment path with one 45° miter. The chip pins become the natural connectors.

import { Pipe } from "./Pipe";
import {
  peripheralPinTip,
  marcatPinTip,
  computePinToPinPath,
  pointsToSvgPath,
  CONNECTIONS,
} from "./geometry";

interface PipePairProps {
  peripheralName: "brand" | "consumer" | "supplier" | "retailer";
  variant: "live" | "built";
}

export function PipePair({ peripheralName, variant }: PipePairProps) {
  const conn = CONNECTIONS[peripheralName];

  // Outward pipe: MarCat → peripheral (tube travels OUT from MarCat to peripheral)
  // Path drawn FROM MarCat pin TO peripheral pin so animateMotion travels that direction.
  const periOut = peripheralPinTip(peripheralName, conn.peripheral.side, conn.peripheral.pinOutward);
  const marcatOut = marcatPinTip(conn.marcat.side, conn.marcat.pinOutward);
  const outwardWaypoints = computePinToPinPath(periOut, conn.peripheral.side, marcatOut, conn.marcat.side);
  // Reverse so the path starts at MarCat (for outward tube direction)
  const outwardReversed = [...outwardWaypoints].reverse();
  const outwardD = pointsToSvgPath(outwardReversed);

  // Inward pipe: peripheral → MarCat (tube travels IN from peripheral to MarCat)
  const periIn = peripheralPinTip(peripheralName, conn.peripheral.side, conn.peripheral.pinInward);
  const marcatIn = marcatPinTip(conn.marcat.side, conn.marcat.pinInward);
  const inwardWaypoints = computePinToPinPath(periIn, conn.peripheral.side, marcatIn, conn.marcat.side);
  // Path direction already peripheral → MarCat
  const inwardD = pointsToSvgPath(inwardWaypoints);

  return (
    <g>
      <Pipe id={`pipe-${peripheralName}-outward`} d={outwardD} variant={variant} />
      <Pipe id={`pipe-${peripheralName}-inward`} d={inwardD} variant={variant} />
    </g>
  );
}
