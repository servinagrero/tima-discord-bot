import Client from "../Client";

export interface Listener {
  (client: Client): void;
}
