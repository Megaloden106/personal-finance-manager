interface Scenario {
  scenarios: ScenarioList;
  url: string;
}

interface ScenarioList {
  GET?: ScenarioResponse;
  DELETE?: ScenarioResponse;
  POST?: ScenarioResponse;
  PUT?: ScenarioResponse;
  PATCH?: ScenarioResponse;
}

interface ScenarioResponse {
  delay: number;
  description: string;
  response: {
    body: any;
    status: number;
  };
}

type Method = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
