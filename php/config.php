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
                "slug" => "app-store-metadata",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'title' => 'App Id',
              'type' => '`$STRING`',
              'short' => 'Unique App Store identifier',
            ],
            [
              'name' => 'appName',
              'title' => 'App Name',
              'type' => '`$STRING`',
              'short' => 'Name of the application',
            ],
            [
              'name' => 'bundleId',
              'title' => 'Bundle Id',
              'type' => '`$STRING`',
              'short' => 'App bundle identifier',
            ],
            [
              'name' => 'category',
              'title' => 'Category',
              'type' => '`$STRING`',
              'short' => 'Primary app category',
            ],
            [
              'name' => 'currency',
              'title' => 'Currency',
              'type' => '`$STRING`',
              'short' => 'Currency code',
            ],
            [
              'name' => 'description',
              'title' => 'Description',
              'type' => '`$STRING`',
              'short' => 'Full app description',
            ],
            [
              'name' => 'developer',
              'title' => 'Developer',
              'type' => '`$STRING`',
              'short' => 'Developer or publisher name',
            ],
            [
              'name' => 'iconUrl',
              'title' => 'Icon Url',
              'type' => '`$STRING`',
              'short' => 'URL to app icon image',
              'format' => 'uri',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'price',
              'title' => 'Price',
              'type' => '`$NUMBER`',
              'short' => 'App price in local currency',
            ],
            [
              'name' => 'rating',
              'title' => 'Rating',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'releaseDate',
              'title' => 'Release Date',
              'type' => '`$STRING`',
              'short' => 'Release date of current version',
              'format' => 'date-time',
            ],
            [
              'name' => 'reviews',
              'title' => 'Reviews',
              'type' => '`$ARRAY`',
              'short' => 'Recent user reviews',
            ],
            [
              'name' => 'screenshots',
              'title' => 'Screenshots',
              'type' => '`$ARRAY`',
              'short' => 'Array of screenshot URLs',
            ],
            [
              'name' => 'version',
              'title' => 'Version',
              'type' => '`$STRING`',
              'short' => 'Current version number',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'app',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/app/{appId}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'app',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'appId',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '284882215',
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'us',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'id',
                    ],
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
