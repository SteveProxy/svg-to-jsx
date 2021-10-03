import axios from 'axios';

const API_ENDPOINT = 'https://api.figma.com/v1';

const endpoints = <const>[
    'files',
    'images'
];

export interface IRequestOptions {
  endpoint: Endpoint | EndpointUnion;
  target?: string;
  prop: string;
  params?: any;
}

enum Endpoint {
  FILES = 'files',
  IMAGES = 'images'
}
type EndpointUnion = `${Endpoint}`;

export class API {

  readonly client = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      'x-figma-token': process.env.FIGMA_TOKEN
    }
  });

  constructor() {
    for (const endpoint of endpoints) {
      this[endpoint] = new Proxy({
        get: ({ target, ...params }: { target?: string }) => (
            this.request({
              endpoint,
              target,
              params,
              prop: ''
            })
        )
      } as any, {
        get: (object: any, prop: string) => (
            (props: { target?: string }) => {
                const { target, ...params } = props;

                const method = object[prop];

                if (method) {
                    return method(props);
                }

                return this.request({
                    endpoint,
                    target,
                    prop,
                    params
                });
            }
        )
      });
    }
  }

  protected request({ endpoint, target, prop, params }: IRequestOptions): Promise<any> {
    return this.client.get(`/${endpoint}/${target ? `${target}/` : ''}${prop}`, {
      params
    })
        .then(({ data }) => data);
  }

}

export interface API {
  files: IFilesEndpoint;
  images: IImagesEndpoint;
}

export interface IFilesEndpoint {
  nodes(params: {
    target: string;
    ids: string;
  }): Promise<{
      nodes: Record<string, INode>;
  }>;
  get(params: {
    target: string;
  }): Promise<unknown>;
}

export interface INode {
    document: {
        children: IElement[];
    };
}

export interface IElement {
    id: string;
    name: string;
}

export interface IImagesEndpoint {
  get(params: {
    target: string;
    ids: string;
    format: Format;
  }): Promise<{
      images: Record<string, string>;
  }>;
}

export enum Format {
  SVG = 'svg'
}
