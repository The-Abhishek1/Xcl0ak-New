(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_api-security_page_tsx_8b21f6._.js", {

"[project]/src/app/api-security/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ApiSecurityPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso-auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
// ── Constants ─────────────────────────────────────────────────────────────────
const SEV = {
    critical: '#ff3a5c',
    high: '#fb923c',
    medium: '#facc15',
    low: '#00aaff',
    info: '#475569'
};
const METHOD_COLOR = {
    GET: '#00ffaa',
    POST: '#00aaff',
    PUT: '#facc15',
    PATCH: '#f472b6',
    DELETE: '#ff3a5c',
    HEAD: '#6366f1',
    OPTIONS: '#94a3b8'
};
const TEST_LABELS = {
    'cors-wildcard': 'CORS Wildcard',
    'cors-reflected': 'CORS Reflected',
    'cors-null': 'CORS Null Origin',
    'jwt-none-alg': 'JWT None Alg',
    'jwt-expired': 'JWT Expired',
    'auth-bypass': 'Auth Bypass',
    'injection-sqli': 'SQL Injection',
    'injection-nosql': 'NoSQL Injection',
    'injection-ssti': 'SSTI',
    'injection-xss': 'XSS',
    'mass-assignment': 'Mass Assignment',
    'method-override': 'Method Override',
    'param-pollution': 'Param Pollution',
    'ssrf-critical': 'SSRF (Critical)',
    'ssrf-potential': 'SSRF',
    'no-rate-limit': 'No Rate Limit'
};
const TEMPLATES = [
    {
        id: 'generic-rest',
        label: 'Generic REST API',
        icon: '🌐',
        description: 'CRUD endpoints with auth — good starting point for any REST API',
        baseUrl: 'https://api.example.com',
        spec: {
            openapi: "3.0.0",
            info: {
                title: "REST API",
                version: "1.0.0"
            },
            servers: [
                {
                    url: "https://api.example.com"
                }
            ],
            paths: {
                "/auth/login": {
                    post: {
                        summary: "Login",
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            username: {
                                                type: "string"
                                            },
                                            password: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            username: "admin",
                                            password: "password"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/auth/register": {
                    post: {
                        summary: "Register",
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            username: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string"
                                            },
                                            password: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            username: "user",
                                            email: "user@test.com",
                                            password: "password123"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/auth/forgot-password": {
                    post: {
                        summary: "Forgot password",
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            email: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            email: "user@test.com"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/users": {
                    get: {
                        summary: "List users",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "page",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "limit",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/users/{id}": {
                    get: {
                        summary: "Get user",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    },
                    put: {
                        summary: "Update user",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            name: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string"
                                            },
                                            role: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            name: "Alice"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/users/{id}/avatar": {
                    post: {
                        summary: "Upload avatar",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/search": {
                    get: {
                        summary: "Search",
                        parameters: [
                            {
                                name: "q",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "url",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "callback",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/admin/users": {
                    get: {
                        summary: "Admin: list users",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ]
                    }
                },
                "/admin/users/{id}": {
                    delete: {
                        summary: "Admin: delete user",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                }
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer"
                    }
                }
            }
        }
    },
    {
        id: 'xcloak',
        label: 'XCloak (your app)',
        icon: '🔭',
        description: 'Pre-built spec for xcloak.tech — scan your own API instantly',
        baseUrl: 'https://xcloak.tech',
        spec: {
            openapi: "3.0.0",
            info: {
                title: "XCloak API",
                version: "1.0.0"
            },
            servers: [
                {
                    url: "https://xcloak.tech"
                }
            ],
            paths: {
                "/api/v1/auth/login": {
                    post: {
                        summary: "Login",
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            username: {
                                                type: "string"
                                            },
                                            password: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            username: "test",
                                            password: "test"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/api/v1/auth/register": {
                    post: {
                        summary: "Register",
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            username: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string"
                                            },
                                            password: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            username: "testuser",
                                            email: "test@test.com",
                                            password: "password123"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/api/v1/auth/forgot-password": {
                    post: {
                        summary: "Forgot password",
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            email: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            email: "test@test.com"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/api/v1/exploits": {
                    get: {
                        summary: "List exploits",
                        parameters: [
                            {
                                name: "q",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "page",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "severity",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/api/v1/exploits/{id}": {
                    get: {
                        summary: "Get exploit",
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ],
                        security: [
                            {
                                bearerAuth: []
                            }
                        ]
                    }
                },
                "/api/v1/cve": {
                    get: {
                        summary: "CVE search",
                        parameters: [
                            {
                                name: "q",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "url",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/api/v1/upload": {
                    post: {
                        summary: "Upload file",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            filename: {
                                                type: "string"
                                            },
                                            content: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/api/v1/monitor": {
                    get: {
                        summary: "List monitored assets",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ]
                    },
                    post: {
                        summary: "Add asset",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            target: {
                                                type: "string"
                                            },
                                            type: {
                                                type: "string"
                                            },
                                            label: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            target: "xcloak.tech",
                                            type: "domain",
                                            label: "test"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/api/v1/cloud": {
                    get: {
                        summary: "List cloud accounts",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ]
                    }
                },
                "/api/v1/compliance": {
                    get: {
                        summary: "Compliance gap analysis",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "framework",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "report",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/api/v1/ai-scan": {
                    post: {
                        summary: "AI prompt injection scan",
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            target_url: {
                                                type: "string"
                                            },
                                            api_key: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer"
                    }
                }
            }
        }
    },
    {
        id: 'ecommerce',
        label: 'E-Commerce API',
        icon: '🛒',
        description: 'Marketplace API with products, orders, payments — tests BOLA on order IDs',
        baseUrl: 'https://api.shop.example.com',
        spec: {
            openapi: "3.0.0",
            info: {
                title: "E-Commerce API",
                version: "1.0.0"
            },
            servers: [
                {
                    url: "https://api.shop.example.com"
                }
            ],
            paths: {
                "/auth/login": {
                    post: {
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            email: {
                                                type: "string"
                                            },
                                            password: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            email: "user@test.com",
                                            password: "password"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/products": {
                    get: {
                        parameters: [
                            {
                                name: "q",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "category",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "url",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/products/{id}": {
                    get: {
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/orders": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ]
                    },
                    post: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            product_id: {
                                                type: "string"
                                            },
                                            quantity: {
                                                type: "string"
                                            },
                                            price: {
                                                type: "string"
                                            },
                                            discount: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            product_id: "123",
                                            quantity: "1",
                                            price: "9.99"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/orders/{id}": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/orders/{id}/cancel": {
                    post: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/users/me": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ]
                    },
                    patch: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            name: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string"
                                            },
                                            role: {
                                                type: "string"
                                            },
                                            isAdmin: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            name: "Alice"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/payments/webhook": {
                    post: {
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            event: {
                                                type: "string"
                                            },
                                            amount: {
                                                type: "string"
                                            },
                                            redirect_url: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/admin/orders": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ]
                    }
                }
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer"
                    }
                }
            }
        }
    },
    {
        id: 'saas',
        label: 'SaaS / Multi-tenant',
        icon: '🏢',
        description: 'Multi-tenant SaaS with orgs, teams, and billing — tests tenant isolation',
        baseUrl: 'https://api.saas.example.com',
        spec: {
            openapi: "3.0.0",
            info: {
                title: "SaaS API",
                version: "1.0.0"
            },
            servers: [
                {
                    url: "https://api.saas.example.com"
                }
            ],
            paths: {
                "/auth/login": {
                    post: {
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            email: {
                                                type: "string"
                                            },
                                            password: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            email: "admin@company.com",
                                            password: "password"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/orgs/{orgId}/members": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "orgId",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    },
                    post: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "orgId",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            email: {
                                                type: "string"
                                            },
                                            role: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            email: "user@test.com",
                                            role: "member"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/orgs/{orgId}/settings": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "orgId",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    },
                    patch: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "orgId",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            name: {
                                                type: "string"
                                            },
                                            plan: {
                                                type: "string"
                                            },
                                            isAdmin: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            name: "My Org"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/projects/{id}": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/projects/{id}/export": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "callback",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "webhook_url",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/billing/webhook": {
                    post: {
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            event: {
                                                type: "string"
                                            },
                                            redirect: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/search": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "q",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "org",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/admin/orgs": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ]
                    }
                }
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer"
                    }
                }
            }
        }
    },
    {
        id: 'iot',
        label: 'IoT / Device API',
        icon: '📡',
        description: 'IoT device management API — tests command injection, SSRF via device callbacks',
        baseUrl: 'https://iot.example.com',
        spec: {
            openapi: "3.0.0",
            info: {
                title: "IoT API",
                version: "1.0.0"
            },
            servers: [
                {
                    url: "https://iot.example.com"
                }
            ],
            paths: {
                "/auth/device": {
                    post: {
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            device_id: {
                                                type: "string"
                                            },
                                            secret: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            device_id: "dev-001",
                                            secret: "secret"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/devices": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ]
                    }
                },
                "/devices/{id}": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/devices/{id}/command": {
                    post: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            cmd: {
                                                type: "string"
                                            },
                                            args: {
                                                type: "string"
                                            },
                                            callback_url: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            cmd: "reboot"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/devices/{id}/logs": {
                    get: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: [
                            {
                                name: "id",
                                in: "path",
                                required: true,
                                schema: {
                                    type: "string"
                                }
                            },
                            {
                                name: "source",
                                in: "query",
                                schema: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                },
                "/firmware/update": {
                    post: {
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            device_id: {
                                                type: "string"
                                            },
                                            url: {
                                                type: "string"
                                            },
                                            version: {
                                                type: "string"
                                            }
                                        },
                                        example: {
                                            device_id: "dev-001",
                                            url: "https://firmware.example.com/v2.bin"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/webhook": {
                    post: {
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            event: {
                                                type: "string"
                                            },
                                            redirect: {
                                                type: "string"
                                            },
                                            src: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer"
                    }
                }
            }
        }
    }
];
// ── URL → Spec builder ────────────────────────────────────────────────────────
function buildSpecFromUrl(baseUrl) {
    const u = baseUrl.replace(/\/$/, '');
    return JSON.stringify({
        openapi: "3.0.0",
        info: {
            title: `${baseUrl} API`,
            version: "1.0.0"
        },
        servers: [
            {
                url: u
            }
        ],
        paths: {
            "/api/auth/login": {
                post: {
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string"
                                        },
                                        password: {
                                            type: "string"
                                        }
                                    },
                                    example: {
                                        username: "admin",
                                        password: "password"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/auth/register": {
                post: {
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string"
                                        },
                                        email: {
                                            type: "string"
                                        },
                                        password: {
                                            type: "string"
                                        }
                                    },
                                    example: {
                                        username: "user",
                                        email: "user@test.com",
                                        password: "password123"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/users": {
                get: {
                    security: [
                        {
                            bearerAuth: []
                        }
                    ]
                }
            },
            "/api/users/{id}": {
                get: {
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        }
                    ]
                },
                put: {
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        }
                    ],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string"
                                        },
                                        role: {
                                            type: "string"
                                        },
                                        isAdmin: {
                                            type: "boolean"
                                        }
                                    },
                                    example: {
                                        name: "Alice"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/search": {
                get: {
                    parameters: [
                        {
                            name: "q",
                            in: "query",
                            schema: {
                                type: "string"
                            }
                        },
                        {
                            name: "url",
                            in: "query",
                            schema: {
                                type: "string"
                            }
                        },
                        {
                            name: "callback",
                            in: "query",
                            schema: {
                                type: "string"
                            }
                        }
                    ]
                }
            },
            "/api/upload": {
                post: {
                    security: [
                        {
                            bearerAuth: []
                        }
                    ]
                }
            },
            "/api/admin": {
                get: {
                    security: [
                        {
                            bearerAuth: []
                        }
                    ]
                }
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                }
            }
        }
    }, null, 2);
}
function authFetch(path, opts) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
    return fetch(path, {
        ...opts,
        headers: {
            'Content-Type': 'application/json',
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {},
            ...opts?.headers
        }
    });
}
// ── Method badge ──────────────────────────────────────────────────────────────
function MethodBadge({ method }) {
    const color = METHOD_COLOR[method] ?? '#64748b';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-mono text-[9px] font-black px-1.5 py-[2px] rounded",
        style: {
            background: `${color}18`,
            color,
            border: `1px solid ${color}30`,
            minWidth: '42px',
            display: 'inline-block',
            textAlign: 'center'
        },
        children: method
    }, void 0, false, {
        fileName: "[project]/src/app/api-security/page.tsx",
        lineNumber: 191,
        columnNumber: 5
    }, this);
}
_c = MethodBadge;
// ── Severity badge ────────────────────────────────────────────────────────────
function SevBadge({ sev }) {
    const c = SEV[sev] ?? '#64748b';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-mono text-[9px] font-black px-1.5 py-[2px] rounded",
        style: {
            background: `${c}18`,
            color: c,
            border: `1px solid ${c}30`
        },
        children: sev.toUpperCase()
    }, void 0, false, {
        fileName: "[project]/src/app/api-security/page.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
_c1 = SevBadge;
function ApiSecurityPage() {
    _s();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
    // Step: 'config' | 'scanning' | 'results'
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('config');
    const [specText, setSpecText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [baseUrl, setBaseUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [authType, setAuthType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const [authToken, setAuthToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [authHeader, setAuthHeader] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('X-API-Key');
    const [authUser, setAuthUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [authPass, setAuthPass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [parsedEps, setParsedEps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [parsing, setParsing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [parseErr, setParseErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showTemplates, setShowTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quickUrl, setQuickUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [scanResult, setScanResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scanId, setScanId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterSev, setFilterSev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [filterTest, setFilterTest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const pollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Parse spec ───────────────────────────────────────────────────────────
    async function parseSpec() {
        if (!specText.trim()) {
            setParseErr('Paste a spec first');
            return;
        }
        setParsing(true);
        setParseErr('');
        setParsedEps([]);
        try {
            const res = await authFetch('/api/v1/api-security?action=parse', {
                method: 'POST',
                body: JSON.stringify({
                    spec_json: specText,
                    base_url_override: baseUrl
                })
            });
            const d = await res.json();
            if (!res.ok) throw new Error(d.error ?? d.detail ?? 'Parse failed');
            setParsedEps(d.endpoints ?? []);
        } catch (e) {
            setParseErr(e.message);
        }
        setParsing(false);
    }
    function buildAuthConfig() {
        if (authType === 'bearer') return {
            type: 'bearer',
            token: authToken
        };
        if (authType === 'apikey') return {
            type: 'apikey',
            token: authToken,
            header_name: authHeader
        };
        if (authType === 'basic') return {
            type: 'basic',
            username: authUser,
            password: authPass
        };
        return {
            type: 'none'
        };
    }
    // ── Start scan ───────────────────────────────────────────────────────────
    async function startScan() {
        if (!specText.trim()) {
            setParseErr('Paste a spec first');
            return;
        }
        setStep('scanning');
        setScanResult(null);
        try {
            const res = await authFetch('/api/v1/api-security?action=scan', {
                method: 'POST',
                body: JSON.stringify({
                    spec_json: specText,
                    base_url: baseUrl,
                    auth_config: buildAuthConfig(),
                    max_workers: 5,
                    timeout: 10
                })
            });
            const d = await res.json();
            if (!res.ok) throw new Error(d.error ?? d.detail ?? 'Scan failed to start');
            setScanId(d.scan_id);
        } catch (e) {
            setStep('config');
            setParseErr(e.message);
        }
    }
    // ── Poll scan ────────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ApiSecurityPage.useEffect": ()=>{
            if (!scanId) return;
            pollRef.current = setInterval({
                "ApiSecurityPage.useEffect": async ()=>{
                    try {
                        const res = await authFetch(`/api/v1/api-security?scan_id=${scanId}`);
                        if (!res.ok) return;
                        const d = await res.json();
                        setScanResult(d);
                        if (d.status === 'complete' || d.status === 'error') {
                            clearInterval(pollRef.current);
                            setStep('results');
                        }
                    } catch  {}
                }
            }["ApiSecurityPage.useEffect"], 2000);
            return ({
                "ApiSecurityPage.useEffect": ()=>clearInterval(pollRef.current)
            })["ApiSecurityPage.useEffect"];
        }
    }["ApiSecurityPage.useEffect"], [
        scanId
    ]);
    // ── Derived state ────────────────────────────────────────────────────────
    const findings = scanResult?.findings ?? [];
    const allTests = [
        ...new Set(findings.map((f)=>f.testId))
    ];
    const sevCounts = findings.reduce((acc, f)=>{
        acc[f.severity] = (acc[f.severity] ?? 0) + 1;
        return acc;
    }, {});
    const filtered = findings.filter((f)=>(filterSev === 'all' || f.severity === filterSev) && (filterTest === 'all' || f.testId === filterTest));
    const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none";
    const inpStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#e2e8f0'
    };
    if (!user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5 flex items-center justify-center h-64",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-4xl mb-3",
                    children: "🔐"
                }, void 0, false, {
                    fileName: "[project]/src/app/api-security/page.tsx",
                    lineNumber: 312,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-mono text-[12px] text-slate-500",
                    children: "Please log in to access API security testing"
                }, void 0, false, {
                    fileName: "[project]/src/app/api-security/page.tsx",
                    lineNumber: 313,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/api-security/page.tsx",
            lineNumber: 311,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/api-security/page.tsx",
        lineNumber: 310,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5 max-w-6xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-5 flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-black",
                                children: [
                                    "API ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#00aaff'
                                        },
                                        children: "Security Testing"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 323,
                                        columnNumber: 51
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[11px] text-slate-500 mt-1",
                                children: "Upload an OpenAPI · Swagger · Postman spec → automated BOLA, JWT, injection, CORS, SSRF tests"
                            }, void 0, false, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    step !== 'config' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setStep('config');
                            setScanId('');
                            setScanResult(null);
                            setParsedEps([]);
                        },
                        className: "px-3 py-2 rounded-xl font-mono text-[10px] cursor-pointer border transition-all",
                        style: {
                            borderColor: 'rgba(255,255,255,0.1)',
                            color: '#64748b'
                        },
                        children: "← New Scan"
                    }, void 0, false, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 329,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/api-security/page.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            step === 'config' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2",
                                        children: "Quick Start — Enter Your API's Base URL"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 344,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: quickUrl,
                                                onChange: (e)=>setQuickUrl(e.target.value),
                                                placeholder: "https://api.yourapp.com",
                                                className: inp + " flex-1",
                                                style: inpStyle,
                                                onKeyDown: (e)=>{
                                                    if (e.key === 'Enter' && quickUrl.trim()) {
                                                        setSpecText(buildSpecFromUrl(quickUrl.trim()));
                                                        setBaseUrl(quickUrl.trim());
                                                        setParsedEps([]);
                                                        setParseErr('');
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 346,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (quickUrl.trim()) {
                                                        setSpecText(buildSpecFromUrl(quickUrl.trim()));
                                                        setBaseUrl(quickUrl.trim());
                                                        setParsedEps([]);
                                                        setParseErr('');
                                                    }
                                                },
                                                disabled: !quickUrl.trim(),
                                                className: "px-3 py-2 rounded-lg font-mono text-[10px] font-bold cursor-pointer border transition-all disabled:opacity-40 shrink-0",
                                                style: {
                                                    background: 'rgba(0,255,170,0.1)',
                                                    borderColor: 'rgba(0,255,170,0.3)',
                                                    color: '#00ffaa'
                                                },
                                                children: "Generate Spec →"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 355,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 345,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-[9px] text-slate-700 mt-1.5",
                                        children: "Auto-generates a standard REST spec for your URL — edit it after to match your exact routes."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 343,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowTemplates((s)=>!s),
                                        className: "w-full flex items-center justify-between px-4 py-3 cursor-pointer transition-colors hover:bg-white/[0.02]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600",
                                                children: "Or Choose a Template"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] text-slate-600",
                                                children: [
                                                    showTemplates ? '▲' : '▼',
                                                    " ",
                                                    TEMPLATES.length,
                                                    " templates"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 374,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 370,
                                        columnNumber: 15
                                    }, this),
                                    showTemplates && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2",
                                        children: TEMPLATES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setSpecText(JSON.stringify(t.spec, null, 2));
                                                    setBaseUrl(t.baseUrl);
                                                    setParsedEps([]);
                                                    setParseErr('');
                                                    setShowTemplates(false);
                                                },
                                                className: "text-left p-3 rounded-xl border cursor-pointer transition-all hover:opacity-90",
                                                style: {
                                                    background: 'rgba(255,255,255,0.03)',
                                                    borderColor: 'rgba(255,255,255,0.08)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-base",
                                                                children: t.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 388,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[10px] font-bold text-slate-200",
                                                                children: t.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-mono text-[9px] text-slate-600 leading-relaxed",
                                                        children: t.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[8px] text-slate-700 mt-1 truncate",
                                                        children: t.baseUrl
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, t.id, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 379,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 377,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 369,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600",
                                                children: "API Spec (OpenAPI / Swagger / Postman JSON)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this),
                                            specText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setSpecText('');
                                                    setParsedEps([]);
                                                    setParseErr('');
                                                },
                                                className: "font-mono text-[9px] cursor-pointer px-2 py-1 rounded border transition-all",
                                                style: {
                                                    borderColor: 'rgba(255,58,92,0.2)',
                                                    color: '#ff3a5c',
                                                    background: 'rgba(255,58,92,0.06)'
                                                },
                                                children: "Clear"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 404,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: specText,
                                        onChange: (e)=>{
                                            setSpecText(e.target.value);
                                            setParsedEps([]);
                                            setParseErr('');
                                        },
                                        placeholder: "3 ways to fill this:\n\n1. Enter your base URL above → click Generate Spec\n2. Choose a template above\n3. Paste your own OpenAPI 3.0 / Swagger 2.0 / Postman Collection JSON here",
                                        rows: 14,
                                        className: inp + " resize-none font-mono text-[10px] leading-relaxed",
                                        style: inpStyle
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 411,
                                        columnNumber: 15
                                    }, this),
                                    parseErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 font-mono text-[10px] px-3 py-2 rounded",
                                        style: {
                                            background: 'rgba(255,58,92,0.08)',
                                            color: '#ff3a5c'
                                        },
                                        children: [
                                            "✗ ",
                                            parseErr
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 420,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 mt-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: parseSpec,
                                            disabled: parsing || !specText.trim(),
                                            className: "px-3 py-2 rounded-lg font-mono text-[10px] font-bold cursor-pointer border transition-all disabled:opacity-40",
                                            style: {
                                                borderColor: 'rgba(255,255,255,0.1)',
                                                color: '#64748b',
                                                background: 'rgba(255,255,255,0.03)'
                                            },
                                            children: parsing ? '⟳ Parsing...' : '⚡ Preview Endpoints'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/api-security/page.tsx",
                                            lineNumber: 426,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 400,
                                columnNumber: 13
                            }, this),
                            parsedEps.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                        children: [
                                            parsedEps.length,
                                            " Endpoints Found"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 437,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1 max-h-48 overflow-y-auto",
                                        children: parsedEps.map((ep, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 py-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MethodBadge, {
                                                        method: ep.method
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 443,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[10px] text-slate-400",
                                                        children: ep.path
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 23
                                                    }, this),
                                                    ep.authRequired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[8px] text-slate-600",
                                                        children: "🔒"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 43
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 442,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 440,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 436,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                        children: "Target URL Override"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 457,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: baseUrl,
                                        onChange: (e)=>setBaseUrl(e.target.value),
                                        placeholder: "https://api.example.com (optional — overrides spec servers)",
                                        className: inp,
                                        style: inpStyle
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 458,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-[9px] text-slate-700 mt-2",
                                        children: "Leave blank to use the URL from the spec. Set this to test staging or a specific environment."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 461,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 456,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                        children: "Authentication"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 468,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1.5 flex-wrap mb-3",
                                        children: [
                                            'none',
                                            'bearer',
                                            'apikey',
                                            'basic'
                                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setAuthType(t),
                                                className: "px-2.5 py-1.5 rounded-lg font-mono text-[9px] font-bold cursor-pointer border transition-all capitalize",
                                                style: authType === t ? {
                                                    background: 'rgba(0,170,255,0.1)',
                                                    borderColor: 'rgba(0,170,255,0.3)',
                                                    color: '#00aaff'
                                                } : {
                                                    background: 'rgba(255,255,255,0.03)',
                                                    borderColor: 'rgba(255,255,255,0.07)',
                                                    color: '#475569'
                                                },
                                                children: t === 'none' ? 'No Auth' : t === 'bearer' ? 'JWT / Bearer' : t === 'apikey' ? 'API Key' : 'Basic'
                                            }, t, false, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 471,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 15
                                    }, this),
                                    authType === 'bearer' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                children: "Bearer Token"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 483,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                value: authToken,
                                                onChange: (e)=>setAuthToken(e.target.value),
                                                placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                                className: inp,
                                                style: inpStyle
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 484,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 482,
                                        columnNumber: 17
                                    }, this),
                                    authType === 'apikey' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                        children: "Header Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: authHeader,
                                                        onChange: (e)=>setAuthHeader(e.target.value),
                                                        placeholder: "X-API-Key",
                                                        className: inp,
                                                        style: inpStyle
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 490,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                        children: "API Key Value"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 496,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        value: authToken,
                                                        onChange: (e)=>setAuthToken(e.target.value),
                                                        placeholder: "sk-...",
                                                        className: inp,
                                                        style: inpStyle
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 495,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 489,
                                        columnNumber: 17
                                    }, this),
                                    authType === 'basic' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                        children: "Username"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: authUser,
                                                        onChange: (e)=>setAuthUser(e.target.value),
                                                        placeholder: "admin",
                                                        className: inp,
                                                        style: inpStyle
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 504,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                        children: "Password"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 510,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        value: authPass,
                                                        onChange: (e)=>setAuthPass(e.target.value),
                                                        placeholder: "••••••",
                                                        className: inp,
                                                        style: inpStyle
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 511,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 509,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 503,
                                        columnNumber: 17
                                    }, this),
                                    authType !== 'none' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-[9px] text-slate-700 mt-2",
                                        children: "Used to test authenticated endpoints and detect JWT weaknesses."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 517,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 467,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                        children: "Tests Included"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 525,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            [
                                                '🔐',
                                                'BOLA / Auth Bypass',
                                                'Unauthenticated access to protected endpoints'
                                            ],
                                            [
                                                '🔑',
                                                'JWT Attacks',
                                                'none alg, expired token acceptance'
                                            ],
                                            [
                                                '🌐',
                                                'CORS Misconfiguration',
                                                'Wildcard, null origin, credentialed'
                                            ],
                                            [
                                                '💉',
                                                'Injection',
                                                'SQLi, NoSQLi, SSTI, XSS in all params'
                                            ],
                                            [
                                                '🏗',
                                                'Mass Assignment',
                                                'Hidden privileged fields in request body'
                                            ],
                                            [
                                                '🔁',
                                                'Method Override',
                                                'X-HTTP-Method-Override bypass'
                                            ],
                                            [
                                                '🔀',
                                                'Param Pollution',
                                                'Duplicate params with conflicting values'
                                            ],
                                            [
                                                '🔗',
                                                'SSRF',
                                                'Internal URL fetch via URL params'
                                            ],
                                            [
                                                '⚡',
                                                'Rate Limiting',
                                                '30-request burst, detect throttling'
                                            ]
                                        ].map(([icon, name, desc])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm shrink-0",
                                                        children: icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 539,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[10px] text-slate-300",
                                                                children: name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 541,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[9px] text-slate-600 ml-2",
                                                                children: desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 542,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, name, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 538,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 526,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 524,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: startScan,
                                className: "w-full py-3 rounded-xl font-mono text-[12px] font-black cursor-pointer transition-all hover:opacity-90",
                                style: {
                                    background: 'rgba(0,170,255,0.1)',
                                    border: '1px solid rgba(0,170,255,0.3)',
                                    color: '#00aaff'
                                },
                                children: "🚀 Start Security Scan"
                            }, void 0, false, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 549,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 454,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/api-security/page.tsx",
                lineNumber: 339,
                columnNumber: 9
            }, this),
            step === 'scanning' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-xl p-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-5xl mb-4 animate-bounce",
                        children: "🔍"
                    }, void 0, false, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 561,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[14px] font-black text-slate-200 mb-2",
                        children: "Scanning API..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 562,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[11px] text-slate-500 mb-6",
                        children: [
                            "Running CORS, JWT, injection, SSRF, rate limit tests against ",
                            scanResult?.endpoints?.length ?? '?',
                            " endpoints"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 563,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-xs mx-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-1.5 rounded-full overflow-hidden",
                            style: {
                                background: 'rgba(255,255,255,0.06)'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 rounded-full animate-pulse",
                                style: {
                                    width: '60%',
                                    background: '#00aaff'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 568,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/api-security/page.tsx",
                            lineNumber: 567,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 566,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[9px] text-slate-700 mt-4",
                        children: [
                            "Scan ID: ",
                            scanId
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 572,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/api-security/page.tsx",
                lineNumber: 560,
                columnNumber: 9
            }, this),
            step === 'results' && scanResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    scanResult.status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-xl p-6 mb-4",
                        style: {
                            border: '1px solid rgba(255,58,92,0.2)',
                            background: 'rgba(255,58,92,0.05)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-mono text-[12px] text-red-400",
                            children: [
                                "✗ Scan failed: ",
                                scanResult.error
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/api-security/page.tsx",
                            lineNumber: 582,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 580,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5",
                        children: [
                            {
                                label: 'Endpoints',
                                val: scanResult.endpoints?.length ?? 0,
                                color: '#e2e8f0'
                            },
                            {
                                label: 'Findings',
                                val: findings.length,
                                color: findings.length > 0 ? '#fb923c' : '#00ffaa'
                            },
                            {
                                label: 'Critical',
                                val: sevCounts.critical ?? 0,
                                color: (sevCounts.critical ?? 0) > 0 ? '#ff3a5c' : '#00ffaa'
                            },
                            {
                                label: 'High',
                                val: sevCounts.high ?? 0,
                                color: (sevCounts.high ?? 0) > 0 ? '#fb923c' : '#00ffaa'
                            },
                            {
                                label: 'Medium',
                                val: (sevCounts.medium ?? 0) + (sevCounts.low ?? 0),
                                color: '#facc15'
                            }
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-3 text-center rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-xl font-black",
                                        style: {
                                            color: s.color
                                        },
                                        children: s.val
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 596,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 597,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, s.label, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 595,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 587,
                        columnNumber: 11
                    }, this),
                    findings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-xl p-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-4xl mb-3",
                                children: "✅"
                            }, void 0, false, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 604,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[14px] font-black text-slate-200 mb-1",
                                children: "No vulnerabilities found"
                            }, void 0, false, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 605,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[11px] text-slate-500",
                                children: [
                                    scanResult.endpoints?.length ?? 0,
                                    " endpoints tested — all security checks passed"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 606,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 603,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl overflow-hidden self-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-2.5 border-b border-white/[0.06]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[9px] uppercase tracking-widest text-slate-600",
                                            children: "By Test"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/api-security/page.tsx",
                                            lineNumber: 615,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 614,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "divide-y divide-white/[0.04]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilterTest('all'),
                                                className: "w-full px-4 py-2.5 text-left font-mono text-[10px] cursor-pointer transition-colors",
                                                style: filterTest === 'all' ? {
                                                    background: 'rgba(0,170,255,0.06)',
                                                    color: '#00aaff'
                                                } : {
                                                    color: '#64748b'
                                                },
                                                children: [
                                                    "All Tests (",
                                                    findings.length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 618,
                                                columnNumber: 19
                                            }, this),
                                            allTests.map((t)=>{
                                                const count = findings.filter((f)=>f.testId === t).length;
                                                const topSev = findings.filter((f)=>f.testId === t).sort((a, b)=>[
                                                        'critical',
                                                        'high',
                                                        'medium',
                                                        'low',
                                                        'info'
                                                    ].indexOf(a.severity) - [
                                                        'critical',
                                                        'high',
                                                        'medium',
                                                        'low',
                                                        'info'
                                                    ].indexOf(b.severity))[0]?.severity ?? 'info';
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setFilterTest((f)=>f === t ? 'all' : t),
                                                    className: "w-full px-4 py-2 text-left flex items-center justify-between cursor-pointer transition-colors",
                                                    style: filterTest === t ? {
                                                        background: 'rgba(0,170,255,0.06)'
                                                    } : {},
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono text-[9px] text-slate-400 truncate max-w-[140px]",
                                                            children: TEST_LABELS[t] ?? t
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/api-security/page.tsx",
                                                            lineNumber: 632,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono text-[9px] font-bold shrink-0",
                                                            style: {
                                                                color: SEV[topSev]
                                                            },
                                                            children: count
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/api-security/page.tsx",
                                                            lineNumber: 635,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, t, true, {
                                                    fileName: "[project]/src/app/api-security/page.tsx",
                                                    lineNumber: 629,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 617,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 613,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1.5 mb-3 flex-wrap",
                                        children: [
                                            'all',
                                            'critical',
                                            'high',
                                            'medium',
                                            'low'
                                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilterSev(s),
                                                className: "px-2.5 py-1.5 rounded-lg font-mono text-[9px] font-bold cursor-pointer border transition-all",
                                                style: filterSev === s ? {
                                                    background: `${SEV[s] ?? '#e2e8f0'}18`,
                                                    borderColor: `${SEV[s] ?? '#e2e8f0'}50`,
                                                    color: SEV[s] ?? '#e2e8f0'
                                                } : {
                                                    background: 'rgba(255,255,255,0.03)',
                                                    borderColor: 'rgba(255,255,255,0.07)',
                                                    color: '#475569'
                                                },
                                                children: s === 'all' ? `All (${findings.length})` : `${s.toUpperCase()} (${sevCounts[s] ?? 0})`
                                            }, s, false, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 650,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 648,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5 max-h-[700px] overflow-y-auto pr-1",
                                        children: filtered.map((f, i)=>{
                                            const isOpen = expanded === `${i}`;
                                            const c = SEV[f.severity] ?? '#64748b';
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl border overflow-hidden cursor-pointer transition-all",
                                                style: {
                                                    borderColor: isOpen ? `${c}40` : 'rgba(255,255,255,0.06)',
                                                    background: isOpen ? `${c}08` : 'rgba(255,255,255,0.02)'
                                                },
                                                onClick: ()=>setExpanded((e)=>e === `${i}` ? null : `${i}`),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 px-4 py-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SevBadge, {
                                                                sev: f.severity
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 674,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MethodBadge, {
                                                                method: f.method
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 675,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[11px] font-black text-slate-200 truncate",
                                                                        children: f.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                                        lineNumber: 677,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[9px] text-slate-600 truncate",
                                                                        children: f.endpoint
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                                        lineNumber: 678,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 676,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[9px] text-slate-700 shrink-0 px-2 py-0.5 rounded",
                                                                style: {
                                                                    background: 'rgba(255,255,255,0.04)'
                                                                },
                                                                children: TEST_LABELS[f.testId] ?? f.testId
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 680,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[10px] text-slate-600 shrink-0",
                                                                children: isOpen ? '▲' : '▼'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 684,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 673,
                                                        columnNumber: 25
                                                    }, this),
                                                    isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-4 pb-4 pt-0 border-t border-white/[0.05] space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-mono text-[10px] text-slate-400 mt-3 leading-relaxed",
                                                                children: f.detail
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 689,
                                                                columnNumber: 29
                                                            }, this),
                                                            f.requestSnippet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[8px] uppercase tracking-widest text-slate-700 mb-1",
                                                                        children: "Request"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                                        lineNumber: 692,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                        className: "font-mono text-[9px] p-2.5 rounded-lg overflow-x-auto",
                                                                        style: {
                                                                            background: 'rgba(0,0,0,0.4)',
                                                                            color: '#00aaff',
                                                                            whiteSpace: 'pre-wrap',
                                                                            wordBreak: 'break-all'
                                                                        },
                                                                        children: f.requestSnippet
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 691,
                                                                columnNumber: 31
                                                            }, this),
                                                            f.responseSnippet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[8px] uppercase tracking-widest text-slate-700 mb-1",
                                                                        children: "Response"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                                        lineNumber: 701,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                        className: "font-mono text-[9px] p-2.5 rounded-lg overflow-x-auto",
                                                                        style: {
                                                                            background: 'rgba(0,0,0,0.4)',
                                                                            color: '#94a3b8',
                                                                            whiteSpace: 'pre-wrap',
                                                                            wordBreak: 'break-all'
                                                                        },
                                                                        children: f.responseSnippet
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                                        lineNumber: 702,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                                lineNumber: 700,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/api-security/page.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/api-security/page.tsx",
                                                lineNumber: 665,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/api-security/page.tsx",
                                        lineNumber: 660,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/api-security/page.tsx",
                                lineNumber: 646,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/api-security/page.tsx",
                        lineNumber: 611,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/api-security/page.tsx",
        lineNumber: 319,
        columnNumber: 5
    }, this);
}
_s(ApiSecurityPage, "47yKNrgc9e5QffivZNCOe70ITVw=");
_c2 = ApiSecurityPage;
var _c, _c1, _c2;
__turbopack_refresh__.register(_c, "MethodBadge");
__turbopack_refresh__.register(_c1, "SevBadge");
__turbopack_refresh__.register(_c2, "ApiSecurityPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/api-security/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_api-security_page_tsx_8b21f6._.js.map