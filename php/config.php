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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'short' => 'Unique App Store identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'appName',
              'short' => 'Name of the application',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'bundleId',
              'short' => 'App bundle identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'short' => 'Primary app category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currency',
              'short' => 'Currency code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Full app description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'developer',
              'short' => 'Developer or publisher name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'iconUrl',
              'short' => 'URL to app icon image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'price',
              'short' => 'App price in local currency',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'rating',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'releaseDate',
              'short' => 'Release date of current version',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reviews',
              'short' => 'Recent user reviews',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'screenshots',
              'short' => 'Array of screenshot URLs',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'version',
              'short' => 'Current version number',
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
