"""create table users, plans, schedules, user_plans

Revision ID: 75b8fb0e8300
Revises: 
Create Date: 2023-11-16 09:22:00.513599

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '75b8fb0e8300'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('plans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('duration', sa.Float(), nullable=False),
    sa.Column('days_per_week', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('schedules',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('from_date_time', sa.DateTime(), nullable=False),
    sa.Column('to_date_time', sa.DateTime(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('phone', sa.String(), nullable=True),
    sa.Column('time_zone', sa.String(), nullable=False),
    sa.Column('subscribed', sa.Boolean(), nullable=True),
    sa.Column('admin', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('features',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('plan_id', sa.Integer(), nullable=True),
    sa.Column('feature_one', sa.String(length=255), nullable=False),
    sa.Column('feature_two', sa.String(length=255), nullable=False),
    sa.Column('feature_three', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['plan_id'], ['plans.id'], name=op.f('fk_features_plan_id_plans')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_plans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('plan_id', sa.Integer(), nullable=False),
    sa.Column('schedule_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['plan_id'], ['plans.id'], name=op.f('fk_user_plans_plan_id_plans')),
    sa.ForeignKeyConstraint(['schedule_id'], ['schedules.id'], name=op.f('fk_user_plans_schedule_id_schedules')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_plans_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_plans')
    op.drop_table('features')
    op.drop_table('users')
    op.drop_table('schedules')
    op.drop_table('plans')
    # ### end Alembic commands ###
