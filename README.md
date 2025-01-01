# Grúas UCAB - Sistema de Gestión de Servicios de Asistencia Vial

## Descripción
Grúas UCAB es una solución integral para la gestión y optimización de servicios de asistencia vial en Venezuela. Este sistema permite a los operadores del centro de atención telefónica crear y asignar órdenes de servicio automáticamente, mientras que los conductores pueden gestionar dichas órdenes desde una aplicación móvil.

La aplicación está diseñada para reducir tiempos de respuesta, optimizar el uso de recursos internos y garantizar un servicio rápido y eficiente para los clientes.

---

## Características Principales
- **Gestión de usuarios:** Administración de roles para administradores, operadores, proveedores y conductores.
- **Asignación automática de órdenes:** Basada en proximidad, disponibilidad y tiempo estimado de atención.
- **Cálculo de costos adicionales:** Administración de tarifas y costos extraordinarios según las características del evento.
- **Notificaciones masivas:** Configuración de notificaciones recurrentes o extemporáneas para conductores.
- **Soporte para microservicios:** Arquitectura escalable basada en CQRS y Mediador.
- **Integración con Firebase y Keycloak:** Manejo de autenticación y mensajería.

---

## Tecnologías Utilizadas
- **Frontend:**
  - Angular.js
  - React Native
  - Bootstrap
- **Backend:**
  - .NET Core 8
  - CQRS + MediatR
  - Entity Framework
  - RabbitMQ + MassTransit SAGA StateMachine
- **Bases de Datos:**
  - PostgreSQL
  - MongoDB
- **Servicios y APIs:**
  - Firebase (Storage + Cloud Messaging)
  - Google APIs
  - Keycloak
  - Hangfire

---
