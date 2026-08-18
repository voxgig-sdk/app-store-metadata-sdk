<?php
declare(strict_types=1);

// AppStoreMetadata SDK configuration

class AppStoreMetadataConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "AppStoreMetadata",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://app-store-metadata-api.kula.app",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "app" => [],
                ],
            ],
            "entity" => [
        'app' => [
          'fields' => [
            [
              'name' => 'appId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'appName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'bundleId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'developer',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'iconUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'price',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'rating',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'releaseDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reviews',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'screenshots',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'version',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'app',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '284882215',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'app_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'us',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/app/{appId}',
                  'parts' => [
                    'api',
                    'app',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'appId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return AppStoreMetadataFeatures::make_feature($name);
    }
}
