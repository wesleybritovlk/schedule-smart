CREATE SCHEMA IF NOT EXISTS company;
CREATE TABLE IF NOT EXISTS company.companies (
    id UUID PRIMARY KEY DEFAULT public.uuid7(),
    name VARCHAR NOT NULL,
    legal_name VARCHAR NOT NULL,
    cnpj VARCHAR NOT NULL,
    slug VARCHAR NOT NULL,
    password TEXT NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
    contact_full_name VARCHAR NOT NULL,
    contact_email VARCHAR NOT NULL,
    contact_phone VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX companies_cnpj_unique_idx ON company.companies (cnpj)
WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX companies_slug_unique_idx ON company.companies (slug)
WHERE deleted_at IS NULL;
CREATE TABLE IF NOT EXISTS company.company_profiles (
    company_id UUID PRIMARY KEY REFERENCES company.companies(id),
    industry VARCHAR,
    emails VARCHAR[],
    phones VARCHAR[],
    websites VARCHAR[],
    addresses TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
