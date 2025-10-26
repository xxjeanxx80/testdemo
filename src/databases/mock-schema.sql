-- Users table with role-based security context
CREATE TABLE users (
  id UUID PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password TEXT,
  role VARCHAR(20) NOT NULL,
  loyalty_points INTEGER DEFAULT 0,
  oauth_provider VARCHAR(50),
  oauth_subject VARCHAR(120),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Spa locations managed by spa owners
CREATE TABLE spas (
  id UUID PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(160) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Booking records linking customers to spa services
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES users(id),
  spa_id UUID NOT NULL REFERENCES spas(id),
  appointment_time TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT NOW()
);
