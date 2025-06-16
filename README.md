# 💳 Proyecto Bancario

Este proyecto es una simulación de una plataforma bancaria en línea que permite a los usuarios registrarse, iniciar sesión y gestionar diversas operaciones financieras como consignaciones, retiros, pagos de servicios y consulta de extractos.

## 🛠️ Funcionalidades Principales

### 🔐 Inicio de Sesión
- Campo de **usuario**.
- Campo de **contraseña**, con validación.
- Redirección al **Dashboard** si es correcta.
- Alerta en caso de credenciales incorrectas.
- Hipervínculos:
  - Crear cuenta.
  - Recordar contraseña.

### 📝 Formulario de Registro
- **Tipo de identificación**: TI, CC, PPT *(obligatorio)*.
- **Número de identificación**: entre 8 y 14 dígitos *(obligatorio)*.
- **Nombre** y segundo nombre *(opcional)*.
- **Apellidos** *(obligatorio)*.
- **Género**, **teléfono**, **correo electrónico**, **dirección**, **ciudad**, **contraseña** *(todos obligatorios)*.
- **Botón cancelar** (hipervínculo) *(obligatorio)*.

### 🔑 Recuperación de Contraseña
1. **Verificación de identidad:**
   - Tipo de documento.
   - Número de identidad.
   - Correo electrónico.
2. **Cambio de contraseña:**
   - Nueva contraseña.
   - Confirmar nueva contraseña.

## 📊 Dashboard Principal

### Información general:
- Número de cuenta bancaria.
- Saldo actual.
- Fecha de creación de la cuenta.

## 📁 Módulos del Menú

### 📄 Resumen de Transacciones
- Últimas 10 transacciones.
- Datos mostrados:
  - Fecha.
  - Número de referencia.
  - Tipo.
  - Descripción.
  - Valor.
- Botón para **imprimir resumen**.

### 💰 Consignación Electrónica
- Muestra:
  - Número de cuenta.
  - Nombre del usuario.
- Solicita:
  - Valor a consignar.
- Genera registro:
  - Fecha.
  - Referencia única.
  - Tipo: `Consignación`.
  - Descripción: `Consignación por canal electrónico`.
  - Valor consignado.
- Aumenta el saldo.
- Opción para **imprimir resumen**.

### 🏧 Retiro de Dinero
- Muestra:
  - Número de cuenta.
  - Nombre del usuario.
- Solicita:
  - Valor a retirar.
- Validación:
  - Verifica si el saldo es suficiente.
  - Verifica si la cuenta destino existe.
- Genera registro:
  - Fecha.
  - Referencia única.
  - Tipo: `Retiro`.
  - Descripción: `Retiro de dinero`.
  - Valor retirado.
- Disminuye el saldo.
- Opción para **imprimir resumen**.

### 🧾 Pago de Servicios Públicos
- Muestra:
  - Número de cuenta.
  - Nombre del usuario.
- Solicita:
  - Servicio (Energía, Agua, Gas, Internet).
  - Referencia.
  - Valor a pagar.
- Genera registro:
  - Fecha.
  - Referencia única.
  - Tipo: `Pago de servicio público <servicio>`.
  - Valor pagado.
- Disminuye el saldo.
- Opción para **imprimir resumen**.

### 📈 Extracto Bancario
- Muestra:
  - Número de cuenta.
  - Nombre del usuario.
- Permite solicitar extractos por:
  - Año.
  - Mes.
  - Todos los movimientos.
- Cada extracto incluye:
  - Fecha.
  - Referencia.
  - Tipo.
  - Descripción.
  - Valor.

### 📄 Certificado Bancario
- Certifica que el usuario tiene una cuenta activa.
- Incluye:
  - Fecha de creación de la cuenta.
- Posibilidad de **imprimir el certificado**.
- Basado en un módulo de certificados bancarios existente.

## 🚧 Estado del Proyecto
> 🟡 En desarrollo – Se están construyendo los formularios y la lógica de transacciones. Próximamente se integrarán funcionalidades de impresión y validación avanzada.

## 📌 Requisitos Técnicos
- Lenguajes sugeridos: HTML, CSS, JavaScript.
- Framework o stack opcional: React / Angular / Vue + Node.js / Express + MongoDB / Firebase.
- Estilo limpio y responsive.

## 📬 Contacto
> Para más información o colaboración, contacta al equipo de desarrollo.
